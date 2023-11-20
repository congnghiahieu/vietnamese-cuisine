import { ScrollView, View, Image } from 'react-native';
import { makeStyles } from '@rneui/themed';
import { STYLES } from '@/lib/constants';
import StyledText from '@/components/Styled/StyledText';
import StyledDivider from '@/components/Styled/StyledDivider';
import { GithubButton, SolidButton } from '@/components/Styled/StyledButton';
import { hp, wp } from '@/lib/utils';
import { GiftIcon } from '@/components/Icon';

const Support = () => {
  console.log('Support re-render');
  const styles = useStyles();
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Image source={require('../../assets/images/new/adaptive-icon.png')} style={styles.icon} />
      </View>
      <View style={styles.block}>
        <StyledText type='Heading_3' color='orange' style={styles.header}>
          Vietnamese Cuisine
        </StyledText>
        <StyledDivider orientation='horizontal' />
        <View style={styles.body}>
          <StyledText type='Body' color='grey' style={{ textAlign: 'justify' }}>
            Vietnamese Cuisine is a small project with purpose introducing Vietnamese food, culture
            throughout the world. This project still in development for new version and enhancement.
            You can help us maintaining this project by actions.
          </StyledText>
          <View
            style={{
              gap: STYLES.GAP.GAP_16,
            }}>
            <SolidButton title={'Donate us'} icon={<GiftIcon />} iconPosition='left' />
            <GithubButton title={'Contribute on Github'} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const useStyles = makeStyles(theme => {
  const dT = theme.mode === 'dark';
  const shadow = dT ? STYLES.SHADOW.SHADOW_WHITE_8 : STYLES.SHADOW.SHADOW_BLACK_8;
  const backgroundColor = dT ? theme.colors.black : theme.colors.white;

  return {
    container: {
      justifyContent: 'center',
      gap: STYLES.GAP.GAP_8,
      padding: STYLES.PADDING.PADDING_16,
      paddingTop: STYLES.PADDING.PADDING_8,
    },
    icon: {
      width: wp(60),
      maxWidth: 250,
      height: hp(30),
      maxHeight: 250,
      // backgroundColor: 'red',
    },
    block: {
      paddingVertical: STYLES.PADDING.PADDING_8,
      borderRadius: STYLES.RADIUS.RADIUS_20,
      backgroundColor,
      ...shadow,
    },
    header: {
      paddingVertical: STYLES.PADDING.PADDING_8,
      textAlign: 'center',
    },
    body: {
      padding: STYLES.PADDING.PADDING_16,
      paddingBottom: STYLES.PADDING.PADDING_8,
      gap: STYLES.GAP.GAP_16,
    },
  };
});

export default Support;
