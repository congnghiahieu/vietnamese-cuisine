import { View } from 'react-native';
import StyledImage from '@/components/Styled/StyledImage';
import { useRouter, useFocusEffect, Redirect } from 'expo-router';
import { makeStyles } from '@rneui/themed';
import { STYLES } from '@/lib/constants';
import { AvatarIconWithCamera, LockIcon, PencilEditIcon, SignOutIcon } from '@/components/Icon';
import StyledPressable from '@/components/Styled/StyledPressable';
import StyledText from '@/components/Styled/StyledText';
import { wp } from '@/lib/utils';
import { SolidButton } from '@/components/Styled/StyledButton';
import { FIREBASE_AUTH } from '@/config/firebase';
import { signOut } from 'firebase/auth';
import StyledToast from '@/components/Styled/StyledToast';
import { useCallback } from 'react';

const Profile = () => {
  console.log('Profile re-render');
  const user = FIREBASE_AUTH.currentUser;
  const router = useRouter();
  console.log('User emailL:', user?.email);
  if (!user) {
    return <Redirect href={'/login'} />;
  }
  // useFocusEffect(
  //   useCallback(() => {
  //     if (!user) {
  //       router.replace('/login');
  //     }
  //   }, []),
  // );

  const handleSignOut = async () => {
    await signOut(FIREBASE_AUTH);
    StyledToast.show({
      type: 'success',
      text1: 'Sign out successfully. Redirecting...',
      visibilityTime: 1000,
      onHide: () => {
        router.push('/login');
      },
    });
  };

  const styles = useStyles();
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
              Name
            </StyledText>
          </View>
          <View style={styles.value}>
            <StyledText type='Placeholder' color='grey'>
              Cong Nghia Hieu
            </StyledText>
          </View>
          <StyledPressable style={styles.editButton}>
            <PencilEditIcon />
          </StyledPressable>
        </View>
        <View style={styles.info}>
          <View style={styles.label}>
            <StyledText type='Heading_5' color='blackGrey'>
              Email
            </StyledText>
          </View>
          <View style={styles.value}>
            <StyledText type='Placeholder' color='grey'>
              info@gmail.com
            </StyledText>
          </View>
        </View>
        <View style={styles.info}>
          <View style={styles.label}>
            <StyledText type='Heading_5' color='blackGrey'>
              Password
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
          title='Sign out'
          icon={<SignOutIcon />}
          iconPosition='left'
          containerStyle={{
            borderRadius: STYLES.RADIUS.RADIUS_10,
          }}
          onPress={handleSignOut}
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
