import { View, KeyboardAvoidingView } from "react-native";
import { makeStyles, useTheme } from "@rneui/themed";
import { STYLES } from "@/lib/constants";
import {
    AvatarIcon,
    CommentIcon,
    HeartFillIcon,
    SendIcon,
} from "@/components/Icon";
import StyledText from "@/components/Styled/StyledText";
import StyledDivider from "@/components/Styled/StyledDivider";
import { useState } from "react";
import { SolidButton } from "@/components/Styled/StyledButton";
import { SearchInput } from "@/components/Styled/StyledInput";
import { StyledFlatList } from "@/components/Styled/StyledList";
import { i18n } from "@/lib/i18n";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { StyledRefreshControl } from "@/components/Styled/StyledLoading";
import { FIREBASE_DB } from "@/config/firebase";
import {
    query,
    collection,
    where,
    getDocs,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { v4 as uuid } from "uuid";

const WORD_LIMIT = 100;

type Comment = {
    commentId: string;
    userId: string;
    content: string;
    createdAt: string;
};
const postComment = async (postId: string, content: string, userId: string) => {
    
    const temp = uuid();
    await setDoc(doc(FIREBASE_DB, "comments", temp), {
        userId: userId,
        content: content,
        createdAt: "10:10",
    });
    const docRef = doc(FIREBASE_DB, "posts", postId);
    await updateDoc(docRef, {
        comments: arrayUnion(temp),
    });
    console.log('post comment success!  ')
};
const useCommentQuery = (postId: string) =>
    useQuery<Comment[]>({
        queryKey: ["comments", postId],
        queryFn: async () => {
            if (!postId) return [];

            const postRef = doc(FIREBASE_DB, "posts", postId);
            const postSnap = await getDoc(postRef);
            if (!postSnap.exists()) return [];

            const commentIdList: string[] = postSnap.data()?.comments || [];
            const commentList = await Promise.all(
                commentIdList.map(async (id) => {
                    const commentRef = doc(FIREBASE_DB, "comments", id);
                    const commentSnap = await getDoc(commentRef);
                    if (!commentSnap.exists()) return undefined;
                    return {
                        commentId: commentSnap.id,
                        ...commentSnap.data(),
                    } as Comment;
                })
            );
            return commentList.filter(
                (comment) => comment !== undefined
            ) as Comment[];
        },
    });

const CommentComponent = () => {
    const styles = useStyles();
    const [comments, setComments] = useState("");
    const { theme } = useTheme();
    const params = useLocalSearchParams();
    const postId = params.postId.toString();
    const { data, isPending, refetch, isFetching } = useCommentQuery(postId);
    const { user } = useAuth();
    const userId: string = user?.email || ''

    return (
        <>
            <StyledDivider orientation="horizontal" />
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
                keyboardVerticalOffset={120}
            >
                <StyledFlatList
                    emptyTitle={i18n.t("community.comment.firstOne")}
                    keyExtractor={({ commentId }) => commentId}
                    data={data}
                    renderItem={({ item }) => <CommentCard {...item} />}
                />
                <StyledDivider orientation="horizontal" />
                <View style={styles.footer}>
                    <View style={styles.info}>
                        <StyledText
                            type="Placeholder"
                            color={theme.mode === "dark" ? "white" : "black"}
                        >
                            {comments.length} / {WORD_LIMIT}
                        </StyledText>
                        <View style={styles.numberContainer}>
                            <View style={styles.number}>
                                <HeartFillIcon />
                                <StyledText type="Heading_4" color="redPink">
                                    55
                                </StyledText>
                            </View>
                            <View style={styles.number}>
                                <CommentIcon />
                                <StyledText type="Heading_4" color="blackGrey">
                                    16
                                </StyledText>
                            </View>
                        </View>
                    </View>
                    <View style={styles.yourComment}>
                        <SearchInput
                            placeholder={i18n.t(
                                "community.comment.postComment"
                            )}
                            containerStyle={{
                                flex: 1,
                            }}
                            maxLength={WORD_LIMIT}
                            value={comments}
                            onChangeText={setComments}
                            blurOnSubmit={false}
                        />
                        <SolidButton
                            icon={<SendIcon width={30} height={30} />}
                            iconPosition="left"
                            containerStyle={{
                                borderRadius: STYLES.RADIUS.RADIUS_10,
                            }}
                            buttonStyle={{
                                paddingHorizontal: STYLES.PADDING.PADDING_16,
                                paddingVertical: STYLES.PADDING.PADDING_8 + 2,
                            }}
                            onPress={() => postComment(postId, comments, userId )}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    );
};

const CommentCard = ({ commentId, userId, content, createdAt }: Comment) => {
    const styles = useStyles();

    return (
        <View style={styles.card}>
            <AvatarIcon />
            <View style={styles.content}>
                <View style={styles.meta}>
                    <StyledText type="Heading_5" color="orange">
                        {userId}
                    </StyledText>
                    <StyledText type="Placeholder" color="blackGrey">
                        2 hours ago
                    </StyledText>
                </View>
                <StyledText type="Comment" color="grey">
                    {content}
                </StyledText>
            </View>
        </View>
    );
};

const useStyles = makeStyles((theme) => {
    const dT = theme.mode === "dark";

    return {
        container: {
            flex: 1,
            backgroundColor: dT ? theme.colors.background : theme.colors.white,
        },
        header: {
            marginHorizontal: STYLES.MARGIN.MARGIN_16,
            marginVertical: STYLES.MARGIN.MARGIN_8,
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            position: "relative",
        },
        backButton: {
            position: "absolute",
            left: 0,
        },
        footer: {
            margin: STYLES.MARGIN.MARGIN_16,
            marginTop: STYLES.MARGIN.MARGIN_4,
            gap: STYLES.GAP.GAP_8,
        },
        info: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        numberContainer: {
            flexDirection: "row",
            alignItems: "center",
            gap: STYLES.GAP.GAP_16,
        },
        number: {
            flexDirection: "row",
            alignItems: "center",
            gap: STYLES.GAP.GAP_4,
        },
        yourComment: {
            flexDirection: "row",
            alignItems: "center",
            gap: STYLES.GAP.GAP_8,
        },
        card: {
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-start",
            gap: STYLES.GAP.GAP_8,
        },
        content: {
            flex: 1,
            paddingHorizontal: STYLES.PADDING.PADDING_16,
            paddingBottom: STYLES.PADDING.PADDING_4,
            // backgroundColor: dT ? theme.colors.background : theme.colors.white,
            backgroundColor: dT ? theme.colors.black : theme.colors.white,
            borderRadius: STYLES.RADIUS.RADIUS_10,
            ...(dT
                ? STYLES.SHADOW.SHADOW_WHITE_8
                : STYLES.SHADOW.SHADOW_BLACK_8),
        },
        meta: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
    };
});

export default CommentComponent;
