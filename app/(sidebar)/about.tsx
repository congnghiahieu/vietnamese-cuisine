import { ScrollView, View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import { STYLES } from '@/lib/constants';
import StyledText from '@/components/Styled/StyledText';
import StyledDivider from '@/components/Styled/StyledDivider';
import {
  FaceBookButton,
  GithubButton,
  TwitterButton,
  OutlineButton,
  SolidButton,
} from '@/components/Styled/StyledButton';
import Animated from 'react-native-reanimated';
import {
  ReFadeInDown,
  ReFadeOutUp,
  ReLightSpeedInLeft,
  ReLightSpeedInRight,
  ReLightSpeedOutLeft,
  ReLightSpeedOutRight,
} from '@/components/Animated';
import { i18n } from '@/lib/i18n';

const About = () => {
  console.log('About re-render');
  const styles = useStyles();
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Animated.View
        style={styles.block}
        entering={ReLightSpeedInLeft}
        exiting={ReLightSpeedOutRight}>
        <StyledText type='Heading_3' color='orange' style={styles.header}>
          {i18n.t('other.appName')}
        </StyledText>
        <StyledDivider orientation='horizontal' />
        <View style={styles.body}>
          <StyledText type='Heading_2' color='grey' style={{ textAlign: 'center' }}>
            {i18n.t('about.version')}
          </StyledText>
          <View style={styles.versionButtonContainer}>
            <SolidButton
              title={i18n.t('about.button.changeLog')}
              containerStyle={styles.versionButton}
            />
            <OutlineButton
              title={i18n.t('about.button.license')}
              containerStyle={styles.versionButton}
              buttonStyle={styles.versionButton}
            />
          </View>
        </View>
      </Animated.View>

      <Animated.View
        style={styles.block}
        entering={ReLightSpeedInRight}
        exiting={ReLightSpeedOutLeft}>
        <StyledText type='Heading_3' color='orange' style={styles.header}>
          {i18n.t('about.social')}
        </StyledText>
        <StyledDivider orientation='horizontal' />
        <View style={[styles.body, { gap: STYLES.GAP.GAP_24 }]}>
          <FaceBookButton title={i18n.t('about.button.facebook')} />
          <GithubButton
            title={i18n.t('about.button.github')}
            titleStyle={{
              marginHorizontal: STYLES.MARGIN.MARGIN_16,
            }}
          />
          <TwitterButton title={i18n.t('about.button.twitter')} />
        </View>
      </Animated.View>

      <Animated.View style={styles.block} entering={ReFadeInDown} exiting={ReFadeOutUp}>
        <StyledText type='Heading_3' color='orange' style={styles.header}>
          {i18n.t('about.disclaimer')}
        </StyledText>
        <StyledDivider orientation='horizontal' />
        <View style={styles.body}>
          <StyledText
            type='Body'
            color='grey'
            style={{
              textAlign: 'justify',
            }}>
            {i18n.t('about.content')}
          </StyledText>
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
      gap: STYLES.GAP.GAP_16,
      padding: STYLES.PADDING.PADDING_16,
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
      gap: STYLES.GAP.GAP_8,
    },
    versionButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: STYLES.GAP.GAP_16,
    },
    versionButton: {
      flex: 1,
      borderRadius: STYLES.RADIUS.RADIUS_10,
    },
  };
});

export default About;
