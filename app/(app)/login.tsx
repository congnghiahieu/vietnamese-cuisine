import { useCallback } from 'react';
import { View } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { makeStyles } from '@rneui/themed';
import { useForm, Controller } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import StyledToast from '@/components/Styled/StyledToast';
import StyledText, { ContinueWithText } from '@/components/Styled/StyledText';
import { FormInput } from '@/components/Styled/StyledInput';
import { SolidButton, GoogleButton } from '@/components/Styled/StyledButton';
import { KeyboardView, SafeView } from '@/components/Styled/StyledView';
import StyledPressable from '@/components/Styled/StyledPressable';
import { ArrowRightIcon } from '@/components/Icon';
import { STYLES } from '@/lib/constants';
import { FIREBASE_AUTH } from '@/config/firebase';
import StyledImage from '@/components/Styled/StyledImage';
import Animated from 'react-native-reanimated';
import {
  ReFadeInLeft,
  ReFadeInRight,
  ReFadeInUp,
  ReFadeOutLeft,
  ReFadeOutRight,
  ReFadeOutUp,
} from '@/components/Animated';
import { dismissKeyboard } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { i18n } from '@/lib/i18n';

type LoginFormInput = {
  email: string;
  password: string;
};

const Login = () => {
  console.log('Login re-render');
  const styles = useStyles();
  const router = useRouter();
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
  const loginSuccess = useCallback(() => {
    StyledToast.show({
      type: 'success',
      text1: i18n.t('login.toast.login.success'),
      onHide: () => {
        router.push('/(app)/(sidebar)');
      },
      visibilityTime: 1000,
    });
  }, []);
  const cleanUp = useCallback(() => {
    loginMutation.reset();
    reset();
  }, []);

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormInput) => {
      await signInWithEmailAndPassword(FIREBASE_AUTH, data.email, data.password);
    },
    onSuccess: () => loginSuccess(),
    onError: () => {
      StyledToast.show({
        type: 'error',
        text1: i18n.t('login.toast.login.error.text1'),
        text2: i18n.t('login.toast.login.error.text2'),
      });
    },
    onSettled: () => {
      cleanUp();
    },
  });
  const googleLoginMutation = useMutation({
    mutationFn: async () => {
      await new Promise(resolve => {
        setTimeout(resolve, 2000);
      });
    },
    onSuccess: () => loginSuccess(),
    onError: () => {
      StyledToast.show({
        type: 'error',
        text1: i18n.t('login.toast.google.error.text1'),
        text2: i18n.t('login.toast.google.error.text2'),
      });
    },
    onSettled: () => {
      cleanUp();
    },
  });

  useFocusEffect(
    useCallback(() => {
      return cleanUp;
    }, []),
  );

  return (
    <SafeView>
      <KeyboardView style={styles.container} onStartShouldSetResponder={dismissKeyboard}>
        <Animated.View entering={ReFadeInUp} exiting={ReFadeOutUp}>
          <View style={{ alignItems: 'center' }}>
            <StyledImage
              source={require('../../assets/images/adaptive-icon.png')}
              style={styles.icon}
            />
          </View>
          <View style={styles.heading}>
            <StyledText type='Heading_3' color='orange'>
              {i18n.t('other.appName')}
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
                  message: i18n.t('login.error.email.required'),
                },
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: i18n.t('login.error.email.pattern'),
                },
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <FormInput
                  inputMode='email'
                  type='normal'
                  placeholder={i18n.t('login.placeholder.email')}
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
                  message: i18n.t('login.error.password.required'),
                },
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <FormInput
                  type='password'
                  placeholder={i18n.t('login.placeholder.password')}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={errors?.password?.message}
                />
              )}
            />
          </View>
          <View style={styles.subField}>
            <StyledPressable
              onPress={() => {
                router.push('/(app)/(sidebar)/');
              }}>
              <StyledText type='SubInputField' color='orange'>
                {i18n.t('login.backToHome')}
              </StyledText>
            </StyledPressable>
            <StyledPressable onPress={() => {}}>
              <StyledText type='SubInputField' color='orange'>
                {i18n.t('login.forgot')}
              </StyledText>
            </StyledPressable>
          </View>
        </Animated.View>
        <Animated.View entering={ReFadeInRight} exiting={ReFadeOutLeft}>
          <View style={styles.button}>
            <SolidButton
              title={i18n.t('login.signIn')}
              icon={<ArrowRightIcon />}
              iconPosition='right'
              onPress={handleSubmit(data => loginMutation.mutate(data))}
              loading={loginMutation.isPending}
            />
            <ContinueWithText />
            <GoogleButton
              onPress={() => googleLoginMutation.mutate()}
              loading={googleLoginMutation.isPending}
            />
          </View>
          <View style={styles.footer}>
            <StyledText type='SubInputField' color='blackGrey'>
              {i18n.t('login.dont')}
            </StyledText>
            <StyledPressable onPress={() => router.push('/register')}>
              <StyledText style={styles.redirectText}>{i18n.t('login.signUp')}</StyledText>
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
