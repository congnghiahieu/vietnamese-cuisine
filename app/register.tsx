import { View, Pressable, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { makeStyles } from '@rneui/themed';
import { STYLES } from '@/lib/constants';
import StyledText, { ContinueWithText } from '@/components/Styled/StyledText';
import StyledInput from '@/components/Styled/StyledInput';
import StyledButton, { GoogleButton } from '@/components/Styled/StyledButton';
import { KeyboardView } from '@/components/Styled/StyledView';
import StyledPressable from '@/components/Styled/StyledPressable';
import { ArrowIcon } from '@/components/Icon';
import { FIREBASE_AUTH}  from 'config/firebase'
import { createUserWithEmailAndPassword  } from 'firebase/auth';




const auth = FIREBASE_AUTH

const Register = () => {
  const styles = useStyles();
  const router = useRouter();

  let email = 'congcong@'
  let password = '123'

  async function signUp() {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('sign up success')
      router.push('/login')
    } catch (error) {
      console.log(error)
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
        <StyledInput type='normal' placeholder='Fullname' />
        <StyledInput type='normal' placeholder='Email' />
        <StyledInput type='password' placeholder='Password' />
        <StyledInput type='password' placeholder='Confirm Password' />
      </View>
      <View style={styles.subField}>
        <StyledPressable onPress={() => router.push('/(sidebar)/(tabs)/')}>
          <StyledText type='SubInputField' color='orange'>
            Back to home
          </StyledText>
        </StyledPressable>
      </View>
      <View style={styles.button}>
        <StyledButton title='Sign Up' icon={<ArrowIcon />} iconPosition='right' onPress={signUp} />
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

export default Register;

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
    alignItems: 'center',
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
