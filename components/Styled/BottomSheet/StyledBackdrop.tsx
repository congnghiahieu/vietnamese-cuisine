import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  useBottomSheet,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { makeStyles } from '@rneui/themed';

export const StyledBackdrop = ({ style, ...otherProps }: BottomSheetDefaultBackdropProps) => {
  const styles = useStyles();

  return (
    <BottomSheetBackdrop
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      enableTouchThrough={false}
      pressBehavior='close'
      style={[style, styles.backdrop]}
      {...otherProps}
    />
  );
};

const useStyles = makeStyles(theme => ({
  backdrop: {
    backgroundColor: theme.mode === 'dark' ? theme.colors.white : theme.colors.black,
  },
}));

// const StyledBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
//   const { theme } = useTheme();
//   // animated variables
//   const containerAnimatedStyle = useAnimatedStyle(() => ({
//     opacity: interpolate(animatedIndex.value, [0, 1, 2], [0, 0.25, 0.5], Extrapolate.CLAMP),
//   }));

//   // styles
//   const containerStyle = useMemo(
//     () => [
//       {
//         backgroundColor: theme.mode === 'dark' ? theme.colors.black : theme.colors.white,
//         zIndex: 0,
//       },
//       style,
//       containerAnimatedStyle,
//     ],
//     [style, containerAnimatedStyle],
//   );

//   return (
//     <Animated.View
//       style={containerStyle}
//       onTouchEnd={() => {
//         // console.log('Backdrop touch');
//       }}
//     />
//   );
// };
