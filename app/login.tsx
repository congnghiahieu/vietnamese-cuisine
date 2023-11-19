import { useCallback } from 'react';
import { TextInput, View, Keyboard } from 'react-native';
import { useRouter, useFocusEffect, useNavigation } from 'expo-router';
import { makeStyles } from '@rneui/themed';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import StyledToast from '@/components/Styled/StyledToast';
import StyledText, { ContinueWithText } from '@/components/Styled/StyledText';
import { FormInput } from '@/components/Styled/StyledInput';
import { SolidButton, GoogleButton } from '@/components/Styled/StyledButton';
import { KeyboardView, SafeView, dismissKeyboard } from '@/components/Styled/StyledView';
import StyledPressable from '@/components/Styled/StyledPressable';
import { ArrowRightIcon } from '@/components/Icon';
import { STYLES } from '@/lib/constants';
import { FIREBASE_AUTH } from '@/config/firebase';
import StyledImage from '@/components/Styled/StyledImage';
import { wp, hp } from '@/lib/utils';
import Animated from 'react-native-reanimated';
import {
  ReFadeInLeft,
  ReFadeInRight,
  ReFadeInUp,
  ReFadeOutLeft,
  ReFadeOutRight,
  ReFadeOutUp,
} from '@/components/Animated';

type LoginFormInput = {
  email: string;
  password: string;
};

const Login = () => {
  const styles = useStyles();
  const router = useRouter();
  const navigate = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInput>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  // Clear form when redirecting between login and register
  useFocusEffect(useCallback(() => reset(), []));

  const loginSuccess = () => {
    StyledToast.show({
      type: 'success',
      text1: 'Login sucessfully. Redirecting ...',
      onHide: () => {
        router.push('/(sidebar)/(home)/');
      },
      visibilityTime: 1000,
    });
  };

  const loginFail = () => {
    StyledToast.show({
      type: 'error',
      text1: 'Fail to login',
      text2: 'Invalid email or password',
    });
    reset();
  };

  const handleLogin: SubmitHandler<LoginFormInput> = async data => {
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, data.email, data.password);
      loginSuccess();
    } catch (error: any) {
      console.log(error.message);
      loginFail();
    }
  };

  const handleGoogleLogin = () => {
    loginSuccess();
  };

  return (
    <SafeView>
      <KeyboardView style={styles.container} onStartShouldSetResponder={dismissKeyboard}>
        <Animated.View entering={ReFadeInUp} exiting={ReFadeOutUp}>
          <View style={{ alignItems: 'center' }}>
            <StyledImage
              source={require('../assets/images/new/adaptive-icon.png')}
              style={styles.icon}
            />
          </View>
          <View style={styles.heading}>
            <StyledText type='Heading_3' color='orange'>
              Vietnamese Cuisine
            </StyledText>
          </View>
        </Animated.View>
        <Animated.View entering={ReFadeInLeft} exiting={ReFadeOutRight}>
          <View style={styles.form}>
            <Controller
              name='email'
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Email is required',
                },
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please fill in valid email',
                },
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <FormInput
                  inputMode='email'
                  type='normal'
                  placeholder='Email'
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={errors?.email?.message}
                />
              )}
            />

            <Controller
              name='password'
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Password is required',
                },
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <FormInput
                  type='password'
                  placeholder='Password'
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={errors?.password?.message}
                />
              )}
            />
          </View>
          <View style={styles.subField}>
            <StyledPressable onPress={() => router.push('/(sidebar)/(home)/')}>
              <StyledText type='SubInputField' color='orange'>
                Back to home
              </StyledText>
            </StyledPressable>
            <StyledPressable onPress={() => {}}>
              <StyledText type='SubInputField' color='orange'>
                Forgot password?
              </StyledText>
            </StyledPressable>
          </View>
        </Animated.View>
        <Animated.View entering={ReFadeInRight} exiting={ReFadeOutLeft}>
          <View style={styles.button}>
            <SolidButton
              title='Sign In'
              icon={<ArrowRightIcon />}
              iconPosition='right'
              onPress={handleSubmit(handleLogin)}
            />
            <ContinueWithText />
            <GoogleButton onPress={handleGoogleLogin} />
          </View>
          <View style={styles.footer}>
            <StyledText type='SubInputField' color='blackGrey'>
              Don't have an account?
            </StyledText>
            <StyledPressable onPress={() => router.push('/register')}>
              <StyledText style={styles.redirectText}>SIGN UP</StyledText>
            </StyledPressable>
          </View>
        </Animated.View>
      </KeyboardView>
    </SafeView>
  );
};

export default Login;

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    marginHorizontal: STYLES.MARGIN.MARGIN_16,
  },
  icon: {
    width: 200,
    height: 200,
  },
  heading: {
    marginVertical: STYLES.MARGIN.MARGIN_8,
    alignItems: 'center',
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
