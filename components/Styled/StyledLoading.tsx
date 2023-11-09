import { Skeleton } from '@rneui/themed';

const StyledLoading = () => {
  return (
    <Skeleton
      style={{
        width: '100%',
        height: '100%',
      }}
      animation='wave'
    />
  );
};

export default StyledLoading;
