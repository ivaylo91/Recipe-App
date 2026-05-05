import { View } from 'react-native';

export default function GlassView({ className = '', children, style }) {
  return (
    <View
      style={[{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1 }, style]}
      className={`rounded-2xl ${className}`}
    >
      {children}
    </View>
  );
}
