import { ScrollView, View, Image } from 'react-native';
import { makeStyles } from '@rneui/themed';
import { STYLES } from '@/lib/constants';
import StyledText from '@/components/Styled/StyledText';
import StyledDivider from '@/components/Styled/StyledDivider';
import { GithubButton, SolidButton } from '@/components/Styled/StyledButton';
import { hp, wp } from '@/lib/utils';
import { GiftIcon } from '@/components/Icon';
import Animated from 'react-native-reanimated';
import { ReBounceIn, ReBounceInDown, ReFadeOutDown, ReFadeOutUp } from '@/components/Animated';
import { i18n } from '@/lib/i18n';

const Support = () => {
  console.log('Support re-render');
  const styles = useStyles();
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Animated.View style={{ alignItems: 'center' }} entering={ReBounceIn} exiting={ReFadeOutUp}>
        <Image source={require('../../../assets/images/adaptive-icon.png')} style={styles.icon} />
      </Animated.View>
      <Animated.View style={styles.block} entering={ReBounceInDown} exiting={ReFadeOutDown}>
        <StyledText type='Heading_3' color='orange' style={styles.header}>
          {i18n.t('other.appName')}
        </StyledText>
        <StyledDivider orientation='horizontal' />
        <View style={styles.body}>
          <StyledText type='Body' color='grey' style={{ textAlign: 'justify' }}>
            {i18n.t('support.content')}
          </StyledText>
          <View
            style={{
              gap: STYLES.GAP.GAP_16,
            }}>
            <SolidButton title={i18n.t('support.donate')} icon={<GiftIcon />} iconPosition='left' />
            <GithubButton title={i18n.t('support.contribute')} />
          </View>
        </View>
      </Animated.View>
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
