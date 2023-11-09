import { Image, ImageProps } from '@rneui/themed';
import StyledLoading from './StyledLoading';

const StyledImage = (props: ImageProps) => {
  const { containerStyle, ...otherProps } = props;

  return (
    <Image
      transition
      transitionDuration={200}
      PlaceholderContent={<StyledLoading />}
      containerStyle={[
        {
          // backgroundColor: 'red',
        },
        containerStyle,
      ]}
      {...otherProps}
    />
  );
};

export default StyledImage;
