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
import Animated, { FadeInLeft, FadeInRight, FadeOutRight } from 'react-native-reanimated';
import {
  ReFadeInDown,
  ReFadeOutUp,
  ReLightSpeedInLeft,
  ReLightSpeedInRight,
  ReLightSpeedOutLeft,
  ReLightSpeedOutRight,
} from '@/components/Animated';

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
          Vietnamese Cuisine
        </StyledText>
        <StyledDivider orientation='horizontal' />
        <View style={styles.body}>
          <StyledText type='Heading_2' color='grey' style={{ textAlign: 'center' }}>
            V1.0
          </StyledText>
          <View style={styles.versionButtonContainer}>
            <SolidButton title={'Change log'} containerStyle={styles.versionButton} />
            <OutlineButton
              title={'License'}
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
          Social Media
        </StyledText>
        <StyledDivider orientation='horizontal' />
        <View style={[styles.body, { gap: STYLES.GAP.GAP_24 }]}>
          <FaceBookButton title={'Like us on Facebook'} />
          <GithubButton
            title={'Star us on Github'}
            titleStyle={{
              marginHorizontal: STYLES.MARGIN.MARGIN_16,
            }}
          />
          <TwitterButton title={'Follow us on Twitter'} />
        </View>
      </Animated.View>

      <Animated.View style={styles.block} entering={ReFadeInDown} exiting={ReFadeOutUp}>
        <StyledText type='Heading_3' color='orange' style={styles.header}>
          Disclaimer
        </StyledText>
        <StyledDivider orientation='horizontal' />
        <View style={styles.body}>
          <StyledText
            type='Body'
            color='grey'
            style={{
              textAlign: 'justify',
            }}>
            Vietnamese Cuisine is unofficial, made by a small group of developer and is NOT
            affiliated to any organization. {'\n'} Some images used in this app are not copyrighted.
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
