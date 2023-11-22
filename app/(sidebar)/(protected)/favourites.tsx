import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Image, View } from "react-native";
import {
    Redirect,
    useFocusEffect,
    useNavigation,
    useRouter,
} from "expo-router";
import { StackActions } from "@react-navigation/native";
import { makeStyles } from "@rneui/themed";
import { STYLES } from "@/lib/constants";
import { hp } from "@/lib/utils";
import StyledText from "@/components/Styled/StyledText";
import { EmptyList, StyledFlatList } from "@/components/Styled/StyledList";
import StyledPressable from "@/components/Styled/StyledPressable";
import { ChevronRightIcon, HeartDislikeIcon } from "@/components/Icon";
import StyledImage from "@/components/Styled/StyledImage";
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
import { useAuthStates } from "@/states/auth";
import { HoldingView } from "@/components/Styled/StyledView";
import { useAuth } from "@/context/AuthContext";

const Favourites = () => {
    console.log("Favourites re-render");
    // const user = FIREBASE_AUTH.currentUser;
    // const { user } = useAuthentication();
    const { user } = useAuth();
    // if (!user) {
    //   return <Redirect href={'/login'} />;
    // }

    const [favouriteList, setFavouriteList] = useState<Favourite[]>([]);
    const getFavouriteList = async () => {
        await setDoc(doc(FIREBASE_DB, "foods", "Nem"), {
            title: "Nem",
            subTitle: "Vietnamese traditional dish",
            imageUrlList: [
                "http://vietnamtravel.com.vn/wp-content/uploads/2020/04/nem-4.jpg",
                "http://vietnamtravel.com.vn/wp-content/uploads/2020/04/nem-3.jpg",
                "https://cdn3.ivivu.com/2022/09/B%C3%A1nh-cu%E1%BB%91n-Thanh-Tr%C3%AC-ivivu-1.jpg",
                "https://i1-giadinh.vnecdn.net/2022/01/22/Thanh-pham-1-2927-1642852742.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=oYjvFa0w9s1Mc22tjb47Ag",
                "https://daotaobeptruong.vn/wp-content/uploads/2020/01/nem-ran-ha-noi.jpg",
            ],
        
            introduce:
                "Theo nhiều tài liệu, nguồn gốc món nem rán là nền ẩm thực Trung Hoa, thuộc nhóm các món dim sum nổi tiếng. Khi du nhập vào nước ta, món nem rán đã được biến tấu thành phần nguyên liệu và gia vị cho phù hợp với khẩu vị của người Việt. Cho đến nay, nem rán trở thành món ăn quen thuộc, không thể thiếu trên cỗ ngày Tết của nhiều gia đình. Sự kết hợp giữa thịt băm, miến, su hào, cà rốt, hành tây, trứng gà, mộc nhĩ, nấm hương cùng các loại gia vị tạo nên miếng nem rán đẹp mắt, ngon miệng làm xiêu lòng người ăn.",
            ingredientList: [
                "600 gr thịt nạc vai xay",
                "200 gr tôm nõn",
                "5 gr mộc nhĩ khô",
                "3 gr nấm hương khô",
                "1 nắm miến",
                "1 củ đậu (hoặc giá đỗ, tùy chọn)",
                "1 củ hành tây",
                "1/2 củ cà rốt",
                "1 - 2 quả trứng",
                "Gia vị: mắm, muối, hạt nêm, hạt tiêu",
                "Bánh đa nem để gói",
                "Bia để phết bánh đa nem cho giòn"
            ],
            steps: [
                {
                    title: "Bước 1: Sơ chế nguyên liệu",
                    content:
                        "Mộc nhĩ, nấm hương ngâm nở, rửa sạch, để ráo và thái nhỏ. Cà rốt, su hào, củ đậu, hành tây thái sợi mỏng nhỏ. Miến ngâm mềm, để khô ráo, cắt nhỏ (không nên ngâm nhũn quá). Rau mùi, hành hoa rửa sạch thái nhỏ. Hành khô băm nhỏ. Tôm tươi bóc vỏ, rồi thái hạt lựu.",
                },
                {
                    title: "Bước 2: Trộn nhân",
                    content:
                        " Cho thịt vào nồi/hoặc âu thêm 1 thìa canh dầu ăn, 1 thìa cà phê hạt nêm, 1 thìa cà phê muối (bột canh), 1 thìa cà phê mắm, 2 thìa cà phê hạt tiêu, trộn đều. Sau đó tiếp tục cho hỗn hợp rau củ vào trộn. Khi nào chuẩn bị gói nem thì mới cho trứng gà để tránh nhân bị chảy nước.",
                },
                {
                    title: "Bước 3: Gói nem",
                    content:
                        "Đặt lá bánh đa nem lên mặt phẳng, dùng khăn xô thấm chút bia cho hơi ẩm thoa đều cho bánh đa nem mềm, thêm 1/2 lá đa nem nữa lót để tránh vỡ nhân khi rán. Múc lượng nhân vừa phải vào, lúc này cho 2-3 miếng tôm tươi đã thái hạt lựu vào và gói đều tay.",
                },
                {
                    title: "Bước 4: Rán nem",
                    content:
                        "Nên rán 2 lần thì nem sẽ giòn rụm, thơm ngon. Lần thứ nhất cho dầu ăn nóng (thử đầu đũa sủi tăm là đạt), cho nem vào rán ở lửa nhỏ vừa, khi nem se mặt và chín khoảng 70- 80% thì vớt ra để giấy thấm dầu cho nguội. Sau đó, chia ra các mẻ (tương đương mỗi bữa ăn), rồi đem cấp đông.",
                },
            ],
            videoLink: "https://youtu.be/KMfZAVBrKPk?si=rMe2l9N3I5jVVWkk",
        });
        
        
        await setDoc(doc(FIREBASE_DB, "foods", "Bún đậu mắm tôm"), {
            title: "Bún đậu mắm tôm",
            subTitle: "Vietnamese traditional dish",
            imageUrlList: [
                "https://bizweb.dktcdn.net/100/438/408/files/mon-an-truyen-thong-viet-nam-4.jpg?v=1694685337627",
                "https://bizweb.dktcdn.net/100/438/408/files/mon-an-truyen-thong-viet-nam-4.jpg?v=1694685337627",
                "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/09/119911_body_-7-2.jpg",
                "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/09/bun-dau-mam-tom-2-1-e1505461736250.jpg",
                "https://dauhomemade.vn/apps/uploads/2019/01/020A3144-1024x682.jpg",
            ],
        
            introduce:
                "Đi đến nơi đâu trên khắp miền đất nước, chúng ta cũng có thể bắt gặp những hàng rong với vị thơm của đậu và mùi mắm tôm thơm phức. Hãy thử sà vào một hàng nào đó xem, ắt bạn sẽ được sự chào đón của cô hàng bún. Này nhé, đầu tiên những bàn tay của cô hàng bún thoăn thoắt cầm dao cắt đậu hũ thành những miếng nhỏ rồi cho vào cái chảo ngập những mỡ, rán lên. Trong lúc đó, những lá bún được cắt ra, bày vào đĩa. Đến khi đậu rán chín vàng, đĩa đậu cắt nhỏ bên cạnh đĩa bún, bát mắm tôm sao hấp dẫn vậy! Bún dùng để ăn trong món này là bún lá. Những lá bún khi ăn cho ta độ dẻo, bùi bùi, không bị chua, lại dễ gắp. Mắm tôm được đựng trong một chiếc bát con. Mắm được vắt chanh rồi đánh bông lên, vài lát ớt và một chút mỡ trên chảo đậu được rưới vào làm cho mùi thơm beo béo dậy lên. Rau sống rửa sạch rồi bày ra đĩa. Bún đậu mắm tôm khi ăn cho ta cảm giác ngậy, thơm, cay cay của ớt, của rau sống.",
            ingredientList: [
                "Bún lá: 500gr",
                "Chả cốm: 200gr",
                "Đậu hũ: 3 bìa",
                "Thịt chân giò: 300gr",
                "Rau ăn kèm: Dưa leo, rau kinh giới, tía tô và các loại rau thơm khác",
                "Gia vị: Mắm tôm, quất, ớt, tỏi, đường, muối, dầu ăn, mì chính và rượu trắng",
            ],
            steps: [
                {
                    title: "Bước 1: Chuẩn bị và chế biến thịt chân giò:",
                    content:
                        "Thịt chân giò rửa sạch dùng dây cuộn chặt lại (bạn có thể nhờ người bán hàng cuộn giúp), cho vào nồi luộc qua nước sôi khoảng 2 phút sau đó đổ phần nước này đi. Thịt đem rửa lại cho sạch, đặt một nồi nước khác, cho thịt vào luộc chín cùng chút muối. Thịt chín lấy ra cho nguội rồi thái miếng mỏng.",
                },
                {
                    title: "Bước 2: Chế biến Đậu và Chả cốm",
                    content:
                        "Đậu hũ rửa qua nước lạnh, để ráo, xắt miếng vừa ăn. Sau đó cho vào chiên vàng các mặt rồi gắp ra đĩa. Vẫn dùng cái chảo vừa rán đậu cho chả cốm vào chiên vàng hai mặt thì gắp ra đĩa, cắt nhỏ thành những miếng vừa ăn.",
                },
                {
                    title: "Bước 3: Chuẩn bị bún và rau xanh ăn kèm",
                    content:
                        "Bún lá cắt miếng vừa ăn. Dưa leo rửa sạch, gọt vỏ, thái miếng. Rau thơm các loại nhặt bỏ cành, lá già, úa sau đó rửa sạch, ngâm nước muối loãng khoảng 30 phút rồi vớt ra rổ, vẩy sạch nước.",
                },
                {
                    title: "Bước 4: Quan trọng – Làm mắm tôm",
                    content:
                        "Lấy khoảng 3 trái quất bổ đôi, vắt lấy nước cốt, bỏ hạt. Ớt rửa sạch, bỏ cuống, xắt lát. Tỏi bóc vỏ, rửa sạch, đập giập, bằm nhỏ. Lấy 1 thìa canh mắm tôm cho vào bát, thêm 1,5 thìa cà phê đường, ít mì chính, nước cốt quất ở trên cùng 1 thìa cà phê rượu trắng và 1 thìa dầu ăn vừa rán đậu khi nãy. Sau đó dùng đũa đánh cho hỗn hợp này sủi bọt, nêm nếm vừa ăn rồi cho phần ớt xắt, tỏi bằm ở trên vào đảo đều là được.",
                },
            ],
            videoLink: "https://youtu.be/QcaSNX__UjU?si=9rAYP1wlf3c2PetP",
        });
        
        
        await setDoc(doc(FIREBASE_DB, "foods", "Bún bò Huế"), {
            title: "Bún bò Huế",
            subTitle: "Vietnamese traditional dish",
            imageUrlList: [
                "https://media.mia.vn/uploads/blog-du-lich/bun-bo-hue-nang-tho-cua-am-thuc-co-do-1-1638013798.jpeg",
                "https://media.mia.vn/uploads/blog-du-lich/bun-bo-hue-nang-tho-cua-am-thuc-co-do-2-1638013798.jpeg",
                "https://media.mia.vn/uploads/blog-du-lich/bun-bo-hue-nang-tho-cua-am-thuc-co-do-7-1638013798.jpeg",
                "https://media.mia.vn/uploads/blog-du-lich/bun-bo-hue-nang-tho-cua-am-thuc-co-do-3-1638013798.jpeg",
                "https://media.mia.vn/uploads/blog-du-lich/bun-bo-hue-nang-tho-cua-am-thuc-co-do-4-1638013798.jpeg",
            ],
        
            introduce:
                "Xuất thân vốn là một món ăn chốn cung đình, chẳng biết từ khi nào Bún bò huế đã trở thành ‘nàng thơ’ mới của nền ẩm thực cố đô. Để rồi từ đó cho đến mãi sau này, cứ mỗi khi nhắc về xứ Huế kinh kỳ, người ta vẫn luôn nhắc đến như là cái nôi, là cội nguồn của món ăn với hương vị đậm đà cùng mùi thơm quyến rũ, hấp dẫn mọi người nhanh đến thưởng thức.",
            ingredientList: [
                "2kg xương ống heo",
                "700g bắp giò heo (nên chọn giò trước)",
                "Hành tím/ đầu hành lá, ngò rí xay mỗi loại 200g",
                "Cọng bún bò tươi",
                "700g bắp bò",
                "20 chả lá Huế",
                "Gia vị nấu bún bò Huế: mắm ruốc Huế Bà Duệ, dầu màu điều, nước mắm, đường phèn, muối, dầu ăn",
                "Rau muống cọng, hoa chuối",
                "100g ớt xanh",
                "100g gừng"
            ],
            steps: [
                {
                    title: "Bước 1: Sơ Chế Nguyên Liệu",
                    content:
                        "Xương ống heo rửa sạch, để ráo nước, cho vào lò nướng với 2 cây sả đập dập, gừng tươi dập, hành tây, thơm, ớt đỏ trong vòng 30 phút. Dùng chỉ hoặc lạt mỏng bó chặt bắp bò và bắp giò heo lại. Bạn nhớ bó thật chặt tay. Sau đó cho ít sả cây, hành tây vào nồi nước sôi, thả bắp bò, bắp giò heo vào chần sơ rồi vớt ra cho vào âu nước đá lạnh. Thả tiếp xương ống heo đã nướng vào nồi nước sôi, chần sơ rồi lại cho vào nước đá. Vớt ra để ráo.",
                },
                {
                    title: "Bước 2: Nấu Nước Dùng",
                    content:
                        "Cho các nguyên liệu nấu bún bò Huế gồm hành tây, gừng đập dập, thơm cắt khoanh, ớt xanh, sả cây vào nồi nước. Khi nước sôi thì cho bắp bò, bắp giò heo, xương ống vào nấu chung, vớt bọt, hạ nhỏ lửa hầm cho đến khi bắp bò và bắp giò heo chín. Sau đó vớt bắp bò, bắp giò heo ra. Tiếp theo, bạn vớt bỏ hành tây, sả, gừng, thơm trong nồi nước dùng ra bỏ và châm thêm nước sôi vào để thay thế lượng nước đã bay hơi trong lúc hầm. Lúc này, bạn đun sôi và nêm lại ½ muỗng canh muối, 2 muỗng canh đường phèn, 3 muỗng canh nước mắm và 80g mắm ruốc (mắm ruốc hòa tan cùng với nước dùng), khuấy đều và bạn nên nêm nếm lại cho vừa với khẩu vị của mình.",
                },
                {
                    title: "Bước 3: Làm Ớt Sa Tế",
                    content:
                        "Cho 1 muỗng canh dầu ăn vào chảo nóng, thêm hành lá, ngò rí, hành tím, tỏi, sả xay vào phi thơm, thêm ớt xay, 1 muỗng canh dầu điều vào trộn đều. Cho một nửa ra chén. Một nửa còn lại xào sơ với bắp bò cho thơm. ",
                },
                {
                    title: "Bước 4: Trình Bày Và Thưởng Thức",
                    content:
                        "Bào mỏng hoa chuối và cọng rau muống. Cắt lát mỏng bắp bò, bắp giò heo. Cắt miếng chả lá Huế hoặc để nguyên cây nếu thích. Trụng sơ bún qua nước sôi, cho lượng bún vừa đủ dùng vào tô, xếp bắp bò, bắp giò heo, chả lá vào tô. Chan nước dùng vào, rắc lên trên ít hành lá và đừng quên thưởng thức cùng hoa chuối, rau muống bào, sa tế.",
                },
            ],
            videoLink: "https://youtu.be/qWK_HYlKrAA?si=f2dDggdrh-GTqs4b",
        });



        try {
            if (user?.email) {
                let favouriteList: Favourite[] = [];
                const docRef = doc(FIREBASE_DB, "users", user.email);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const fetchedFavouriteList =
                        docSnap.data()?.favouritedFoods || [];
                    for (const foodId of fetchedFavouriteList) {
                        const foodRef = doc(FIREBASE_DB, "foods", foodId);
                        const foodSnap = await getDoc(foodRef);
                        if (foodSnap.exists()) {
                            const { title, imageUrl } = foodSnap.data();
                            const temp: Favourite = { title, imageUrl };
                            favouriteList.push(temp);
                        }
                    }
                }
                setFavouriteList(favouriteList);
                console.log(favouriteList);
            }
        } catch (error) {
            console.error(
                "Error fetching food list data from FIRESTORE:",
                error
            );
        }
    };

    useEffect(() => {
        getFavouriteList();
    }, []);
    return (
        <FavouriteList favouriteList={favouriteList} />
        // <FavoriteList favoriteList={[]} />
    );
};

type Favourite = {
    title: string;
    imageUrl: string;
};

const FavouriteCard = ({ title, imageUrl }: Favourite) => {
    const styles = useStyles();
    const router = useRouter();

    return (
        <View style={styles.card}>
            <StyledImage
                source={{
                    uri: imageUrl,
                }}
                style={styles.cardImage}
            />
            <StyledPressable style={styles.cardDislikeButton}>
                <HeartDislikeIcon />
            </StyledPressable>
            <View style={styles.cardFooter}>
                <StyledText type="Heading_5" color="white">
                    {title}
                </StyledText>
                <StyledPressable
                    style={styles.redirectButton}
                    onPress={() =>
                        router.push({
                            pathname: "/information/[foodId]",
                            params: {
                                foodId: "Phở",
                            },
                        })
                    }
                >
                    <ChevronRightIcon />
                </StyledPressable>
            </View>
        </View>
    );
};

type FavouriteListProps = {
    favouriteList: Favourite[];
};

const FavouriteList = ({ favouriteList }: FavouriteListProps) => {
    return (
        <StyledFlatList
            emptyTitle=""
            keyExtractor={({ title }) => title}
            data={favouriteList}
            renderItem={({ item }) => <FavouriteCard {...item} />}
            ListEmptyComponent={FavouriteEmpty}
        />
    );
};

const FavouriteEmptySubField = () => {
    const router = useRouter();

    return (
        <StyledPressable onPress={() => router.push("/(sidebar)")}>
            <StyledText
                type="SubInputField"
                color="orange"
                style={{
                    textDecorationLine: "underline",
                }}
            >
                Explore more Vietnamese food
            </StyledText>
        </StyledPressable>
    );
};

const FavouriteEmpty = () => {
    return (
        <EmptyList
            title="No favourite dish"
            subField={<FavouriteEmptySubField />}
        />
    );
};

const useStyles = makeStyles((theme) => {
    const dT = theme.mode === "dark";
    return {
        redirectButton: {
            backgroundColor: theme.colors.white,
            borderRadius: STYLES.RADIUS.RADIUS_50,
        },
        card: {
            flexBasis: "100%",
            height: hp(40),
            position: "relative",
            borderRadius: STYLES.RADIUS.RADIUS_10,
            backgroundColor: dT ? theme.colors.black : theme.colors.white,
            ...STYLES.SHADOW.SHADOW_ORANGE_8,
        },
        cardImage: {
            zIndex: 0,
            width: "100%",
            height: "100%",
            borderRadius: STYLES.RADIUS.RADIUS_10,
        },
        cardDislikeButton: {
            position: "absolute",
            top: 0,
            right: 0,
            margin: STYLES.MARGIN.MARGIN_4,
            zIndex: 1,
        },
        cardFooter: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            margin: STYLES.MARGIN.MARGIN_8,
            zIndex: 1,
        },
    };
});

export default Favourites;
