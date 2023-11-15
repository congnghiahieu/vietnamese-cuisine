import { useRef, useMemo, useState, useEffect } from "react";
import { Image, View } from "react-native";
import { Slider, ListItem, makeStyles, useTheme } from "@rneui/themed";
import { useRouter, useLocalSearchParams } from "expo-router";
import BottomSheet, {
    useBottomSheetSpringConfigs,
    BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import StyledHandle, {
    StyledHandleProps,
} from "@/components/Styled/BottomSheet/StyledHandle";
import StyledBackdrop from "@/components/Styled/BottomSheet/StyledBackdrop";
import StyledBackground, {
    StyledBackgroundProps,
} from "@/components/Styled/BottomSheet/StyledBackground";
import StyledText from "@/components/Styled/StyledText";
import StyledPressable from "@/components/Styled/StyledPressable";
import { SolidButton } from "@/components/Styled/StyledButton";
import {
    PlayCircleIcon,
    ChevronLeftIcon,
    HeartIcon,
    AudioControlIcon,
} from "@/components/Icon";
import { hp } from "@/lib/utils";
import { STYLES } from "@/lib/constants";
import StyledImage from "@/components/Styled/StyledImage";
import { SafeView } from "@/components/Styled/StyledView";
import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB } from "@/config/firebase";
import {
    query,
    collection,
    where,
    getDocs,
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";

const Information = () => {
    const styles = useStyles();

    return (
        <SafeView>
            <ImageSlide />
            <InformationBottomSheet />
        </SafeView>
    );
};

type ImageSlideProps = {
    imageUrlList?: string[];
};

const ImageSlide = (props?: ImageSlideProps) => {
    const styles = useStyles();
    const router = useRouter();

    return (
        <View style={styles.imageSlideContainer}>
            <StyledPressable
                onPress={() => router.back()}
                style={styles.backButton}
            >
                <ChevronLeftIcon />
            </StyledPressable>
            <StyledImage
                source={{
                    uri: "https://file1.dangcongsan.vn/data/0/images/2021/02/08/duongntcd/13-chung-tet-td.jpg?dpi=150&quality=100&w=680",
                }}
                style={styles.image}
            />
        </View>
    );
};

const InformationBottomSheet = () => {
    const snapPoints = useMemo(() => ["50%", "70%", "90%"] as const, []);

    return (
        <BottomSheet
            index={0}
            snapPoints={snapPoints}
            handleComponent={InformationBottomSheetHandle}
            backdropComponent={StyledBackdrop}
            backgroundComponent={InformationBottomSheetBackground}
            enablePanDownToClose={false}
        >
            <InformationBottomSheetBody />
        </BottomSheet>
    );
};

const InformationBottomSheetHandle = (props: StyledHandleProps) => {
    const bottomSheetstyles = useBottomSheetStyles();
    return <StyledHandle {...props} style={bottomSheetstyles.handle} />;
};

const InformationBottomSheetBackground = ({
    style: defaultStyle,
    ...otherProps
}: StyledBackgroundProps) => {
    const bottomSheetstyles = useBottomSheetStyles();
    return (
        <StyledBackground
            style={[defaultStyle, bottomSheetstyles.background]}
            {...otherProps}
        />
    );
};

const useBottomSheetStyles = makeStyles((theme) => {
    return {
        handle: {
            backgroundColor: theme.colors.background,
            borderBottomWidth: 0,
        },
        background: {
            backgroundColor: theme.colors.background,
        },
    };
});

const InformationBottomSheetBody = () => {
    const styles = useStyles();
    const [like, setLike] = useState(false);
    const params = useLocalSearchParams();
    const foodId = params.id.toString();
    const [ingredientList, setIngredientList] = useState<string[]>([]);
    const [steps, setSteps] = useState<{ title: string; content: string }[]>(
        []
    );
    const [introduce, setIntroduce] = useState<string>("");
    const [videoLink, setVideoLink] = useState<string>("");
    const getFoodData = async () => {
        try {
            const docRef = doc(FIREBASE_DB, "foods", foodId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const fetchedIngredientList =
                    docSnap.data()?.ingredientList || [];
                const fetchedSteps = docSnap?.data()?.steps || [];
                const fetchedIntro = docSnap?.data()?.introduce || "";
                const fetchedVideoLink = docSnap?.data()?.videoLink || "";
                setIngredientList(fetchedIngredientList);
                setSteps(fetchedSteps);
                setIntroduce(fetchedIntro);
                setVideoLink(fetchedVideoLink);
            }
        } catch (error) {
            console.error("Error fetching food data from FIRESTORE:", error);
        }
    };

    useEffect(() => {
        getFoodData();
    }, []);

    return (
        <BottomSheetScrollView contentContainerStyle={styles.body}>
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <StyledText type="Heading_2" color="orange">
                        Phở
                    </StyledText>
                    <StyledText type="Body" color="grey">
                        Vietnamese traditional breakfast
                    </StyledText>
                </View>
                <StyledPressable onPress={() => setLike((prev) => !prev)}>
                    <HeartIcon active={like} />
                </StyledPressable>
            </View>
            <View style={styles.story}>
                <StyledText type="Heading_3" color="orange">
                    Story
                </StyledText>
                <AudioControl />
                <StyledText
                    type="Body"
                    color="grey"
                    style={{ textAlign: "justify" }}
                >
                    Phở nổi tiếng nhất vẫn là phở Hà Nội. Không biết tự bao giờ,
                    phở đã trở thành món ăn vô cùng hấp dẫn mỗi khi đến Hà Nội.
                    Với hương vị độc đáo không có một nơi nào có được, phở Hà
                    Nội đã in sâu vào tiềm thức con người, mặc định nó là món ăn
                    ngon nhất. Muốn ăn phở phải đến Hà Nội. Vào những năm 1940.
                    phở đã rất nổi tiếng ở Hà Nội. Phở là một món ăn có thể ăn
                    vào bất cứ khoảng thời gian nào mà bạn muốn: sáng, trưa,
                    chiều, tối đều được cả. Điểm đặc biệt, món phở không ăn kèm,
                    uống kèm bất cứ thứ gì khác. Một bát phở bao gồm: nước dùng,
                    bánh phở, gia vị ăn kèm như tiêu, hành lá, lát chanh, ớt…
                    Nước dùng của phở có thể được chế biến từ xương bò: xương
                    cục, xương ống và xương vè. Bánh phở phải dai, mềm. Hành lá,
                    ớt, tiêu tăng thêm mùi vị của bát phở. Tùy thuộc vào bí
                    quyết nấu mà mỗi nơi lại có mùi vị của phở khác nhau.
                </StyledText>
            </View>
            <View>
                <StyledText type="Heading_3" color="orange">
                    Ingredients
                </StyledText>
                <IngredientList ingredients={ingredientList} />
            </View>
            <View>
                <StyledText type="Heading_3" color="orange">
                    Steps
                </StyledText>
                <StepList steps={steps} />
            </View>
            <SolidButton
                title="How to make Pho"
                icon={<PlayCircleIcon />}
                iconPosition="right"
                containerStyle={{
                    marginBottom: STYLES.MARGIN.MARGIN_32,
                    borderRadius: STYLES.RADIUS.RADIUS_10,
                }}
                buttonStyle={{
                    paddingVertical: STYLES.PADDING.PADDING_16,
                }}
            />
        </BottomSheetScrollView>
    );
};

type IngredientListProps = {
    ingredients: string[];
};

const IngredientList = ({ ingredients }: IngredientListProps) => {
    const styles = useStyles();
    const splitPoint = Math.ceil(ingredients.length / 2);
    const ingredientList_1 = ingredients.slice(0, splitPoint);
    const ingredientList_2 = ingredients.slice(splitPoint);

    return (
        <View style={styles.ingredientList}>
            <IngredientSubList ingredients={ingredientList_1} />
            <IngredientSubList ingredients={ingredientList_2} />
        </View>
    );
};

const IngredientSubList = ({ ingredients }: IngredientListProps) => {
    return (
        <View style={{ flex: 1 }}>
            {ingredients.map((ingredient, index) => (
                <ListItem
                    key={`${ingredient}-${index}`}
                    containerStyle={{
                        paddingVertical: STYLES.PADDING.PADDING_4,
                    }}
                >
                    <ListItem.Content>
                        <StyledText type="Body" color="grey">
                            {ingredient}
                        </StyledText>
                    </ListItem.Content>
                </ListItem>
            ))}
        </View>
    );
};

type StepListProps = {
    steps: {
        title: string;
        content: string;
    }[];
};

const StepList = ({ steps }: StepListProps) => {
    return (
        <View>
            {steps.map((step) => (
                <ListItem key={step.title}>
                    <ListItem.Content>
                        <StyledText type="Heading_4" color="blackGrey">
                            {step.title}
                        </StyledText>
                        <StyledText
                            type="Body"
                            color="grey"
                            style={{ textAlign: "justify" }}
                        >
                            {step.content}
                        </StyledText>
                    </ListItem.Content>
                </ListItem>
            ))}
        </View>
    );
};

const AudioControl = () => {
    const styles = useStyles();
    const [playing, setPlaying] = useState(false);

    return (
        <View style={styles.audioControlContainer}>
            <StyledPressable onPress={() => setPlaying((prev) => !prev)}>
                <AudioControlIcon active={playing} />
            </StyledPressable>
            <AudioSlider />
        </View>
    );
};

const AudioSlider = () => {
    const [sliderValue, setSliderValue] = useState(0);
    const { theme } = useTheme();
    const styles = useStyles();

    return (
        <Slider
            value={sliderValue}
            onValueChange={setSliderValue}
            maximumValue={50}
            minimumValue={0}
            step={1}
            allowTouchTrack
            orientation="horizontal"
            minimumTrackTintColor={theme.colors.orange}
            maximumTrackTintColor={theme.colors.whiteGrey}
            trackStyle={styles.track}
            thumbStyle={styles.thumb}
            thumbTouchSize={{
                width: STYLES.ICON_SIZE.ICON_SIZE_24,
                height: STYLES.ICON_SIZE.ICON_SIZE_24,
            }}
            style={{
                flex: 1,
            }}
        />
    );
};

const useStyles = makeStyles((theme) => {
    const dT = theme.mode === "dark";

    return {
        imageSlideContainer: {
            position: "relative",
        },
        backButton: {
            backgroundColor: dT ? theme.colors.black : theme.colors.white,
            position: "absolute",
            top: STYLES.MARGIN.MARGIN_8,
            left: STYLES.MARGIN.MARGIN_8,
            zIndex: 1,
            borderRadius: STYLES.RADIUS.RADIUS_50,
        },
        image: {
            width: "100%",
            height: hp(55),
        },
        body: {
            // flex: 1,
            paddingHorizontal: STYLES.PADDING.PADDING_16,
            // marginTop: STYLES.MARGIN.MARGIN_8,
            gap: STYLES.GAP.GAP_16,
        },
        headerContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
        },
        header: {},
        story: {
            gap: STYLES.GAP.GAP_16,
        },
        audioControlContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: STYLES.PADDING.PADDING_8,
            paddingVertical: STYLES.PADDING.PADDING_4,
            borderRadius: STYLES.RADIUS.RADIUS_10,
            backgroundColor: dT ? theme.colors.black : theme.colors.white,
            ...(dT
                ? STYLES.SHADOW.SHADOW_WHITE_4
                : STYLES.SHADOW.SHADOW_BLACK_4),
        },
        track: {
            height: 2,
            backgroundColor: theme.colors.orange,
            color: theme.colors.orange,
        },
        thumb: {
            width: 20,
            height: 20,
            borderRadius: STYLES.RADIUS.RADIUS_20,
            backgroundColor: theme.colors.orange,
        },
        ingredientList: {
            flexDirection: "row",
            justifyContent: "space-between",
        },
    };
});

export default Information;
