import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';

const useSidebar = () => {
  const navigation = useNavigation();

  return {
    close: () => navigation.dispatch(DrawerActions.closeDrawer()),
    open: () => navigation.dispatch(DrawerActions.openDrawer()),
  };
};

export default useSidebar;
