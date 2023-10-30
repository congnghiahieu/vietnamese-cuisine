import { BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';

const StyledBackdrop = (props: BottomSheetBackdropProps) => {
  return (
    <BottomSheetBackdrop
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      enableTouchThrough={false}
      pressBehavior='close'
      {...props}
    />
  );
};

export default StyledBackdrop;
