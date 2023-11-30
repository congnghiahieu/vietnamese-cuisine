import { Image, ImageProps } from '@rneui/themed';
import { StyledImageLoading } from './StyledLoading';

const StyledImage = (props: ImageProps) => {
  const { containerStyle, ...otherProps } = props;

  return (
    <Image
      transition
      transitionDuration={200}
      PlaceholderContent={<StyledImageLoading />}
      containerStyle={[
        {
          // backgroundColor: "red"
        },
        containerStyle,
      ]}
      placeholderStyle={{
        overflow: 'hidden',
      }}
      {...otherProps}
    />
  );
};

export default StyledImage;
