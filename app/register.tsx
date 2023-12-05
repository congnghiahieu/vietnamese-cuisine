import { useCallback } from "react";
import { View } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { makeStyles } from "@rneui/themed";
import { useForm, Controller } from "react-hook-form";
import StyledText, { ContinueWithText } from "@/components/Styled/StyledText";
import { FormInput } from "@/components/Styled/StyledInput";
import { SolidButton, GoogleButton } from "@/components/Styled/StyledButton";
import { KeyboardView, SafeView } from "@/components/Styled/StyledView";
import StyledPressable from "@/components/Styled/StyledPressable";
import StyledToast from "@/components/Styled/StyledToast";
import { ArrowRightIcon } from "@/components/Icon";
import { STYLES } from "@/lib/constants";
import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB } from "@/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
    query,
    collection,
    where,
    getDocs,
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";
import Animated from "react-native-reanimated";
import {
    ReFadeInDown,
    ReFadeInLeft,
    ReFadeInUp,
    ReFadeOutDown,
    ReFadeOutLeft,
    ReFadeOutUp,
} from "@/components/Animated";
import { useMutation } from "@tanstack/react-query";
import { dismissKeyboard } from "@/lib/utils";
import { i18n } from "@/lib/i18n";

type RegisterFormInput = {
    fullname: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const Register = () => {
    console.log("Register re-render");
    const styles = useStyles();
    const router = useRouter();
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RegisterFormInput>({
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    const cleanUp = useCallback(() => {
        registerMutation.reset();
        reset();
    }, []);
    const registerMutation = useMutation({
        mutationFn: async (data: RegisterFormInput) => {
            const { user } = await createUserWithEmailAndPassword(
                FIREBASE_AUTH,
                data.email,
                data.password
            );
            const userEmail = user?.email?.toString() || data.email;
            await setDoc(doc(FIREBASE_DB, "users", userEmail), {
                email: userEmail,
                fullname: data.fullname,
                favouritedFoods: [],
                lovePosts: [],
            });
        },
        onSuccess: () => {
            StyledToast.show({
                type: "success",
                text1: i18n.t("register.toast.register.success"),
                onHide: () => {
                    router.push("/login");
                },
                visibilityTime: 1000,
            });
        },
        onError: () => {
            StyledToast.show({
                type: "error",
                text1: i18n.t("register.toast.register.error.text1"),
                text2: i18n.t("register.toast.register.error.text2"),
            });
        },
        onSettled: () => cleanUp(),
    });
    const googleRegisterMutation = useMutation({
        mutationFn: async () => {
            // Register Google = Login Google
            await new Promise((resolve) => {
                setTimeout(resolve, 2000);
            });
        },
        onSuccess: () => {
            StyledToast.show({
                type: "success",
                text1: i18n.t("register.toast.google.success"),
                onHide: () => {
                    router.push("/(app)/(sidebar)/");
                },
                visibilityTime: 1000,
            });
        },
        onError: () => {
            StyledToast.show({
                type: "error",
                text1: i18n.t("register.toast.google.error.text1"),
                text2: i18n.t("register.toast.google.error.text2"),
            });
        },
        onSettled: () => cleanUp(),
    });

    useFocusEffect(
        useCallback(() => {
            return cleanUp;
        }, [])
    );

    return (
        <SafeView>
            <KeyboardView
                style={styles.container}
                onStartShouldSetResponder={dismissKeyboard}
            >
                <Animated.View entering={ReFadeInUp} exiting={ReFadeOutUp}>
                    <View style={styles.heading}>
                        <StyledText type="Heading_2" color="blackGrey">
                            {i18n.t("register.welcome")} 👋
                        </StyledText>
                        <StyledText type="Body" color="blackGrey">
                            {i18n.t("register.please")}
                        </StyledText>
                    </View>
                </Animated.View>
                <Animated.View entering={ReFadeInLeft} exiting={ReFadeOutLeft}>
                    <View style={styles.form}>
                        <Controller
                            name="fullname"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: i18n.t(
                                        "register.error.fullname.required"
                                    ),
                                },
                            }}
                            render={({
                                field: { value, onChange, onBlur },
                            }) => (
                                <FormInput
                                    type="normal"
                                    placeholder={i18n.t(
                                        "register.placeholder.fullname"
                                    )}
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    errorMessage={errors.fullname?.message}
                                />
                            )}
                        />

                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: i18n.t(
                                        "register.error.email.required"
                                    ),
                                },
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: i18n.t(
                                        "register.error.email.pattern"
                                    ),
                                },
                            }}
                            render={({
                                field: { value, onChange, onBlur },
                            }) => (
                                <FormInput
                                    inputMode="email"
                                    type="normal"
                                    placeholder={i18n.t(
                                        "register.placeholder.email"
                                    )}
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    errorMessage={errors.email?.message}
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: i18n.t(
                                        "register.error.password.required"
                                    ),
                                },
                                minLength: {
                                    value: 6,
                                    message: i18n.t(
                                        "register.error.password.minLength"
                                    ),
                                },
                            }}
                            render={({
                                field: { value, onChange, onBlur },
                            }) => (
                                <FormInput
                                    type="password"
                                    placeholder={i18n.t(
                                        "register.placeholder.password"
                                    )}
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    errorMessage={errors.password?.message}
                                />
                            )}
                        />

                        <Controller
                            name="confirmPassword"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: i18n.t(
                                        "register.error.confirmPassword.required"
                                    ),
                                },
                                validate: (value, formValues) =>
                                    value === formValues.password
                                        ? true
                                        : i18n.t(
                                              "register.error.confirmPassword.notMatch"
                                          ),
                            }}
                            render={({
                                field: { value, onChange, onBlur },
                            }) => (
                                <FormInput
                                    type="password"
                                    placeholder={i18n.t(
                                        "register.placeholder.confirmPassword"
                                    )}
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    errorMessage={
                                        errors.confirmPassword?.message
                                    }
                                />
                            )}
                        />
                    </View>
                    <View style={styles.subField}>
                        <StyledPressable
                            onPress={() => {
                                router.push("/(app)/(sidebar)/");
                            }}
                        >
                            <StyledText type="SubInputField" color="orange">
                                {i18n.t("register.backToHome")}
                            </StyledText>
                        </StyledPressable>
                    </View>
                </Animated.View>
                <Animated.View entering={ReFadeInDown} exiting={ReFadeOutDown}>
                    <View style={styles.button}>
                        <SolidButton
                            title={i18n.t("register.signUp")}
                            icon={<ArrowRightIcon />}
                            iconPosition="right"
                            onPress={handleSubmit((data) =>
                                registerMutation.mutate(data)
                            )}
                            loading={registerMutation.isPending}
                        />
                        <ContinueWithText />
                        <GoogleButton
                            onPress={() => googleRegisterMutation.mutate()}
                            loading={googleRegisterMutation.isPending}
                        />
                    </View>
                    <View style={styles.footer}>
                        <StyledText type="SubInputField" color="blackGrey">
                            {i18n.t("register.already")}
                        </StyledText>
                        <StyledPressable onPress={() => router.push("/login")}>
                            <StyledText style={styles.redirectText}>
                                {i18n.t("register.signIn")}
                            </StyledText>
                        </StyledPressable>
                    </View>
                </Animated.View>
            </KeyboardView>
        </SafeView>
    );
};

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        marginHorizontal: STYLES.MARGIN.MARGIN_16,
    },
    heading: {
        alignItems: "flex-start",
        gap: STYLES.GAP.GAP_8,
        marginVertical: STYLES.MARGIN.MARGIN_16,
    },
    form: {},
    subField: {
        marginTop: STYLES.MARGIN.MARGIN_4,
        marginBottom: STYLES.MARGIN.MARGIN_16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    arrowIcon: {
        fontSize: STYLES.ICON_SIZE.ICON_SIZE_24,
        color: theme.colors.white,
    },
    continueContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: STYLES.GAP.GAP_8,
    },
    button: {
        gap: STYLES.GAP.GAP_8,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: STYLES.MARGIN.MARGIN_32,
    },
    redirectText: {
        fontFamily: "Inter_600SemiBold",
        fontSize: STYLES.FONT_SIZE.FONT_SIZE_16,
        color: theme.colors.orange,
    },
}));

export default Register;
