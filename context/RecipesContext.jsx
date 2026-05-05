import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { recipes as staticRecipes, categories, dailyMenu } from '../data/recipes';

const RecipesContext = createContext(null);

export function RecipesProvider({ children }) {
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setUserRecipes(data.map(toFrontend));
      });
  }, []);

  const recipes = [...userRecipes, ...staticRecipes];

  const addRecipe = async (data, user) => {
    const row = {
      user_id:     user?.id ?? null,
      title:       data.title,
      description: data.description,
      image:       data.image,
      category:    data.category,
      difficulty:  data.difficulty,
      time:        data.time,
      calories:    data.calories,
      ingredients: data.ingredients,
      steps:       data.steps,
      chef_name:   user?.name || 'Анонимен',
      chef_avatar: user?.avatar || `https://i.pravatar.cc/48?u=${user?.id}`,
    };

    const { data: inserted, error } = await supabase
      .from('recipes')
      .insert(row)
      .select()
      .single();

    if (error) throw new Error(error.message);

    setUserRecipes((prev) => [toFrontend(inserted), ...prev]);
    return inserted.id;
  };

  return (
    <RecipesContext.Provider value={{ recipes, categories, dailyMenu, addRecipe }}>
      {children}
    </RecipesContext.Provider>
  );
}

export const useRecipes = () => useContext(RecipesContext);

function toFrontend(row) {
  return {
    id:          row.id,
    title:       row.title,
    description: row.description,
    image:       row.image,
    category:    row.category,
    difficulty:  row.difficulty,
    time:        row.time,
    calories:    row.calories,
    ingredients: row.ingredients || [],
    steps:       row.steps || [],
    rating:      row.rating ?? 0,
    reviews:     row.reviews ?? 0,
    featured:    row.featured ?? false,
    chef:        row.chef_name || 'Анонимен',
    chefAvatar:  row.chef_avatar || `https://i.pravatar.cc/48?u=${row.id}`,
    userId:      row.user_id,
    userAdded:   true,
  };
}
