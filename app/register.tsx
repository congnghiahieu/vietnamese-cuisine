import { View, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { makeStyles } from '@rneui/themed';
import StyledText, { ContinueWithText } from '@/components/Styled/StyledText';
import { FormInput } from '@/components/Styled/StyledInput';
import { SolidButton, GoogleButton } from '@/components/Styled/StyledButton';
import { KeyboardView } from '@/components/Styled/StyledView';
import StyledPressable from '@/components/Styled/StyledPressable';
import { ArrowRightIcon } from '@/components/Icon';
import { STYLES } from '@/lib/constants';
import { FIREBASE_AUTH } from '@/config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
  const styles = useStyles();
  const router = useRouter();

  let email = 'pjzon1999@gmail.com';
  let password = '123456';

  async function signUp() {
    try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      console.log('sign up success');
      router.push('/login');
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <KeyboardView style={styles.container}>
      <View style={styles.heading}>
        <StyledText type='Heading_2' color='blackGrey'>
          Welcome 👋
        </StyledText>
        <StyledText type='Body' color='blackGrey'>
          Pleases fill out information to create an account
        </StyledText>
      </View>
      <View style={styles.form}>
        <FormInput type='normal' placeholder='Fullname' />
        <FormInput type='normal' placeholder='Email' />
        <FormInput type='password' placeholder='Password' />
        <FormInput type='password' placeholder='Confirm Password' />
      </View>
      <View style={styles.subField}>
        <StyledPressable onPress={() => router.push('/(sidebar)/(tabs)/')}>
          <StyledText type='SubInputField' color='orange'>
            Back to home
          </StyledText>
        </StyledPressable>
      </View>
      <View style={styles.button}>
        <SolidButton
          title='Sign Up'
          icon={<ArrowRightIcon />}
          iconPosition='right'
          onPress={signUp}
        />
        <ContinueWithText />
        <GoogleButton />
      </View>
      <View style={styles.footer}>
        <StyledText type='SubInputField' color='blackGrey'>
          Already have an account?
        </StyledText>
        <StyledPressable onPress={() => router.push('/login')}>
          <StyledText style={styles.redirectText}>SIGN IN</StyledText>
        </StyledPressable>
      </View>
    </KeyboardView>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    marginHorizontal: STYLES.MARGIN.MARGIN_16,
    marginTop: StatusBar.currentHeight || 0,
  },
  heading: {
    alignItems: 'flex-start',
    gap: STYLES.GAP.GAP_8,
    marginVertical: STYLES.MARGIN.MARGIN_16,
  },
  form: {},
  subField: {
    marginTop: STYLES.MARGIN.MARGIN_4,
    marginBottom: STYLES.MARGIN.MARGIN_16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowIcon: {
    fontSize: STYLES.ICON_SIZE.ICON_SIZE_24,
    color: theme.colors.white,
  },
  continueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: STYLES.GAP.GAP_8,
  },
  button: {
    gap: STYLES.GAP.GAP_8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: STYLES.MARGIN.MARGIN_32,
  },
  redirectText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: STYLES.FONT_SIZE.FONT_SIZE_16,
    color: theme.colors.orange,
  },
}));

export default Register;
