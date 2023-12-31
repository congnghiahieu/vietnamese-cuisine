import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { makeStyles } from '@rneui/themed';
import { STYLES } from '@/lib/constants';
import { AvatarIconWithCamera, LockIcon, PencilEditIcon, SignOutIcon } from '@/components/Icon';
import StyledPressable from '@/components/Styled/StyledPressable';
import StyledText from '@/components/Styled/StyledText';
import { wp } from '@/lib/utils';
import { SolidButton } from '@/components/Styled/StyledButton';
import { FIREBASE_AUTH, FIREBASE_DB } from '@/config/firebase';
import { signOut } from 'firebase/auth';
import StyledToast from '@/components/Styled/StyledToast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { i18n } from '@/lib/i18n';
import { doc, getDoc } from 'firebase/firestore';
import { ErrorView, LoadingView } from '@/components/Styled/StyledView';
import { User } from '@/config/model';

const useProfileQuery = ({ email }: { email: string }) =>
  useQuery<User>({
    queryKey: ['profile', email],
    queryFn: async () => {
      const docRef = doc(FIREBASE_DB, 'users', email);
      const userDoc = await getDoc(docRef);
      if (!userDoc.exists()) throw new Error(i18n.t('other.errorOccurr'));

      const user = userDoc.data() as User;
      return user;
    },
  });

const Profile = () => {
  const { user } = useAuth();

  console.log('Profile re-render');
  const styles = useStyles();
  const router = useRouter();
  const { data: dbUser, isPending, isError, error } = useProfileQuery({ email: user?.email! });
  const signOutMutation = useMutation({
    mutationFn: async () => {
      await signOut(FIREBASE_AUTH);
    },
    onSuccess: () =>
      StyledToast.show({
        type: 'success',
        text1: i18n.t('profile.toast.success'),
        visibilityTime: 1000,
        onHide: () => {
          router.push('/(app)/auth/login');
        },
      }),
    onError: () =>
      StyledToast.show({
        type: 'error',
        text1: i18n.t('profile.toast.error.text1'),
        text2: i18n.t('profile.toast.error.text2'),
      }),
    onSettled: () => {
      signOutMutation.reset();
    },
  });

  if (isPending) {
    return <LoadingView />;
  }
  if (isError) {
    return <ErrorView errorMessage={error.message} />;
  }

  return (
    <View style={styles.container}>
      <StyledPressable
        style={{
          alignItems: 'center',
        }}>
        <AvatarIconWithCamera />
      </StyledPressable>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <View style={styles.label}>
            <StyledText type='Heading_5' color='blackGrey'>
              {i18n.t('profile.label.name')}
            </StyledText>
          </View>
          <View style={styles.value}>
            <StyledText type='Placeholder' color='grey'>
              {dbUser.fullname}
            </StyledText>
          </View>
          <StyledPressable style={styles.editButton}>
            <PencilEditIcon />
          </StyledPressable>
        </View>
        <View style={styles.info}>
          <View style={styles.label}>
            <StyledText type='Heading_5' color='blackGrey'>
              {i18n.t('profile.label.email')}
            </StyledText>
          </View>
          <View style={styles.value}>
            <StyledText type='Placeholder' color='grey'>
              {dbUser.email}
            </StyledText>
          </View>
        </View>
        <View style={styles.info}>
          <View style={styles.label}>
            <StyledText type='Heading_5' color='blackGrey'>
              {i18n.t('profile.label.password')}
            </StyledText>
          </View>
          <View style={styles.value}>
            <StyledText type='Placeholder' color='grey'>
              ********
            </StyledText>
          </View>
          <StyledPressable style={styles.editButton}>
            <LockIcon />
          </StyledPressable>
        </View>
        <SolidButton
          title={i18n.t('profile.label.signOut')}
          icon={<SignOutIcon />}
          iconPosition='left'
          containerStyle={{
            borderRadius: STYLES.RADIUS.RADIUS_10,
          }}
          loading={signOutMutation.isPending}
          onPress={() => signOutMutation.mutate()}
        />
      </View>
    </View>
  );
};

const useStyles = makeStyles(theme => {
  const dT = theme.mode === 'dark';
  const backgroundColor = dT ? theme.colors.black : theme.colors.white;
  const shadow = dT ? STYLES.SHADOW.SHADOW_WHITE_8 : STYLES.SHADOW.SHADOW_BLACK_8;

  return {
    container: {
      flex: 1,
      padding: STYLES.PADDING.PADDING_16,
    },
    infoContainer: {
      backgroundColor,
      padding: STYLES.PADDING.PADDING_16,
      borderRadius: STYLES.RADIUS.RADIUS_20,
      ...shadow,
      gap: STYLES.GAP.GAP_16,
      marginTop: STYLES.MARGIN.MARGIN_8,
    },
    info: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    label: {
      // flexBasis: 100,
      width: wp(30),
      // width: 110,
      maxWidth: 110,
      // flexBasis: wp(28),
    },
    value: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    editButton: {
      backgroundColor: `${theme.colors.green}33`,
      borderRadius: STYLES.RADIUS.RADIUS_10,
    },
  };
});

export default Profile;
