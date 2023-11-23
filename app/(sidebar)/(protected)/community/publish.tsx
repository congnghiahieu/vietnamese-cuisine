import { View, TextInput, ScrollView, Platform } from "react-native";
import { makeStyles, useTheme } from "@rneui/themed";
import { STYLES } from "@/lib/constants";
import { AvatarIcon, ImageIcon, PencilPostIcon } from "@/components/Icon";
import StyledText from "@/components/Styled/StyledText";
import StyledPressable from "@/components/Styled/StyledPressable";
import { useState } from "react";
import { TEXT_STYLE_TYPE_MAP } from "@/components/Theme/Text";
import { SolidButton } from "@/components/Styled/StyledButton";
import { hp, wp } from "@/lib/utils";
import StyledCarousel from "@/components/Styled/StyledCarousel";
import * as ImagePicker from "expo-image-picker";
import StyledDivider from "@/components/Styled/StyledDivider";
import { getCurrentTimeString } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
    FIREBASE_APP,
    FIREBASE_AUTH,
    FIREBASE_DB,
    storage,
} from "@/config/firebase";
import {
    query,
    collection,
    where,
    getDocs,
    doc,
    getDoc,
    setDoc,
    addDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import 'react-native-get-random-values';
import { v4 } from 'uuid';

const imageUrlList = [
    "https://media.cnn.com/api/v1/images/stellar/prod/170504142019-pho.jpg?q=w_1110,c_fill/f_webp",
    "https://media.cnn.com/api/v1/images/stellar/prod/170504152158-cha-ca.jpg?q=w_1110,c_fill/f_webp",
    "https://media.cnn.com/api/v1/images/stellar/prod/170504142339-banh-xeo.jpg?q=w_1110,c_fill/f_webp",
    "https://media.cnn.com/api/v1/images/stellar/prod/111005063013-vietnam-food-cao-lau.jpg?q=w_1110,c_fill/f_webp",
    "https://media.cnn.com/api/v1/images/stellar/prod/170306134418-goi-cuon.jpg?q=w_1110,c_fill/f_webp",
    "https://media.cnn.com/api/v1/images/stellar/prod/170504151643-banh-knot.jpg?q=w_1110,c_fill/f_webp",
    "https://media.cnn.com/api/v1/images/stellar/prod/170504151239-bun-bo-nam-bo.jpg?q=w_1110,c_fill/f_webp",
    "https://media.cnn.com/api/v1/images/stellar/prod/170504150749-ga-nuong.jpg?q=w_1110,c_fill/f_webp",
    "https://media.cnn.com/api/v1/images/stellar/prod/160524100325-05-vietnam-dishes-xoi.jpg?q=w_1110,c_fill/f_webp",
    "https://media.cnn.com/api/v1/images/stellar/prod/170504150157-banh-cuon.jpg?q=w_1110,c_fill/f_webp",
    "https://media.cnn.com/api/v1/images/stellar/prod/160524092144-vietnam-street-food-bot-chien.jpg?q=w_1110,c_fill/f_webp",
    "https://media.cnn.com/api/v1/images/stellar/prod/170504145056-bun-cha.jpg?q=w_1110,c_fill/f_webp",
    "https://media.cnn.com/api/v1/images/stellar/prod/170124150901-26-banh-mi.jpg?q=w_1110,c_fill/f_webp",
    "https://media.cnn.com/api/v1/images/stellar/prod/170504144408-banh-bao.jpg?q=w_1110,c_fill/f_webp",
];
const WORD_LIMIT = 500;
const Publish = () => {
    const styles = useStyles();
    const { theme } = useTheme();
    const [thought, setThought] = useState("");
    const [_, requestLibraryPermission] =
        ImagePicker.useMediaLibraryPermissions();
    const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([]);
    const { user } = useAuth();

    const publishPost = async () => {
        // Add a new post with a generated id.
        try {
            const urls = [];
            for (const image of images) {
                const response = await fetch(image.uri);
                const blob = await response.blob();

                const tempRef = ref(storage, `images/${v4()}`);
                await uploadBytes(tempRef, blob);
                console.log("Image uploaded successfully!");
                const downloadURL = await getDownloadURL(tempRef);
                urls.push(downloadURL);
            }

            const docRef = await addDoc(collection(FIREBASE_DB, "posts"), {
                userId: user?.email,
                content: "just fake content",
                imageUrlList: urls,
                loveNumber: 0,
                comments: [],
                createdAt: getCurrentTimeString(),
            });
            console.log("publish successfully");
        } catch (error) {
            console.log(error);
        }
    };

    const pickImages = async () => {
        const status = await requestLibraryPermission();
        if (!status.granted) {
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsMultipleSelection: true,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            orderedSelection: true,
            quality: 1,
        });
        if (!result.canceled) {
            setImages(result.assets);
        }
    };

    return (
        <>
            <StyledDivider orientation="horizontal" />
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.contentHeader}>
                    <AvatarIcon />
                    <StyledText type="Heading_4" color="orange">
                        Cong Nghia Hieu
                    </StyledText>
                    <StyledPressable
                        style={styles.imageButton}
                        onPress={pickImages}
                    >
                        <ImageIcon />
                    </StyledPressable>
                </View>
                <View style={styles.writeThought}>
                    <StyledText
                        type="Placeholder"
                        color={theme.mode === "dark" ? "white" : "black"}
                    >
                        {thought.length} / {WORD_LIMIT}
                    </StyledText>
                    <TextInput
                        placeholder="Write your thought"
                        placeholderTextColor={theme.colors.whiteGrey}
                        multiline
                        maxLength={WORD_LIMIT}
                        // numberOfLines={DEFAULT_LINE}
                        style={styles.input}
                        value={thought}
                        onChangeText={setThought}
                    />
                </View>
                <View style={styles.imageContainer}>
                    {images.length ? (
                        <StyledCarousel
                            imageUrlList={imageUrlList}
                            width={wp(100) - STYLES.MARGIN.MARGIN_16 * 2}
                            height={hp(50)}
                        />
                    ) : (
                        <StyledPressable
                            style={styles.imagePlaceholder}
                            onPress={pickImages}
                        >
                            <StyledText type="Heading_2" color="blackGrey">
                                Pick some images
                            </StyledText>
                        </StyledPressable>
                    )}
                </View>
                <SolidButton
                    title="Publish this post"
                    icon={<PencilPostIcon />}
                    iconPosition="left"
                    containerStyle={{
                        borderRadius: STYLES.RADIUS.RADIUS_10,
                        marginTop: STYLES.MARGIN.MARGIN_16,
                    }}
                    onPress={publishPost}
                />
            </ScrollView>
        </>
    );
};

const useStyles = makeStyles((theme) => {
    const dT = theme.mode === "dark";

    return {
        container: {
            flex: 1,
            backgroundColor: dT ? theme.colors.black : theme.colors.white,
            paddingHorizontal: STYLES.PADDING.PADDING_16,
            paddingTop: STYLES.PADDING.PADDING_8,
        },
        contentHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        imageButton: {
            backgroundColor: `${theme.colors.green}33`,
            borderRadius: STYLES.RADIUS.RADIUS_10,
            padding: STYLES.PADDING.PADDING_8,
        },
        writeThought: {
            marginTop: STYLES.MARGIN.MARGIN_8,
            gap: STYLES.GAP.GAP_8,
        },
        input: {
            textAlignVertical: "top",
            textAlign: "left",
            ...TEXT_STYLE_TYPE_MAP.Body,
            color: theme.colors.grey,
            minHeight: 100,
            maxHeight: 150,
            ...(Platform.OS === "ios" ? {} : {}),
        },
        imageContainer: {
            height: hp(48),
            marginTop: STYLES.MARGIN.MARGIN_8,
            borderRadius: STYLES.RADIUS.RADIUS_10,
            overflow: "hidden",
        },
        imagePlaceholder: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderStyle: "dashed",
            borderColor: theme.colors.blackGrey,
            borderWidth: 2,
            borderRadius: STYLES.RADIUS.RADIUS_10,
        },
    };
});

export default Publish;
