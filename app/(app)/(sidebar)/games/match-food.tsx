import { useEffect, useState } from 'react';
import { ImageSourcePropType, View, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import StyledDivider from '@/components/Styled/StyledDivider';
import { GameHeaderRight } from '@/components/Styled/StyledHeader';
import { makeStyles, useTheme } from '@rneui/themed';
import { LifeIcon, QuestionIcon } from '@/components/Icon';
import { hp, shuffleArray } from '@/lib/utils';
import StyledText from '@/components/Styled/StyledText';
import { STYLES } from '@/lib/constants';
import StyledImage from '@/components/Styled/StyledImage';
import StyledPressable from '@/components/Styled/StyledPressable';
import { v4 as uuid } from 'uuid';
import { useSound } from '@/hooks/useSound';
import { i18n } from '@/lib/i18n';
import Animated, { CurvedTransition } from 'react-native-reanimated';

const ROWS = 5;
const COLS = 4;
const FACE_UP_LIMIT = 2;
const MAX_LIFE = 30;
const IMAGES: ImageSourcePropType[] = [
  require('../../../../assets/images/match-food/banh-can.jpg'),
  require('../../../../assets/images/match-food/banh-da-cua.jpg'),
  require('../../../../assets/images/match-food/banh-mi.jpeg'),
  require('../../../../assets/images/match-food/banh-xeo.jpg'),
  require('../../../../assets/images/match-food/bun-cha-1.jpg'),
  require('../../../../assets/images/match-food/bun-cha-2.webp'),
  require('../../../../assets/images/match-food/bun-cha-3.jpg'),
  require('../../../../assets/images/match-food/ca-kho-to.jpg'),
  require('../../../../assets/images/match-food/canh-chua-ca-loc.jpg'),
  require('../../../../assets/images/match-food/com-chay.jpg'),
  require('../../../../assets/images/match-food/com-tam.jpg'),
  require('../../../../assets/images/match-food/chao-ca-loc.jpg'),
  require('../../../../assets/images/match-food/cha-ruoi.jpg'),
  require('../../../../assets/images/match-food/goi-cuon.jpg'),
  require('../../../../assets/images/match-food/hu-tieu.jpg'),
  require('../../../../assets/images/match-food/kho-quet.jpg'),
  require('../../../../assets/images/match-food/pho-1.webp'),
  require('../../../../assets/images/match-food/pho-2.webp'),
  require('../../../../assets/images/match-food/pho-3.jpg'),
  require('../../../../assets/images/match-food/spring-roll-1.webp'),
  require('../../../../assets/images/match-food/spring-roll-2.jpg'),
  require('../../../../assets/images/match-food/sui-din.jpg'),
];

type RowColProps = {
  rows: number;
  cols: number;
};

type Face = {
  faceId: string;
  source: ImageSourcePropType;
};

const getFaces = ({ rows, cols }: RowColProps) => {
  // copy array
  const images = Array.from(IMAGES);
  const faces: Face[] = [];
  for (let i = 0; i < (rows * cols) / 2; i++) {
    // Randomly pick one from the array of faces
    const randomIndex = Math.floor(Math.random() * images.length);
    const face: Face = {
      faceId: uuid(),
      source: images[randomIndex],
    };
    // Push 2 copies onto array
    faces.push(face, face);
    // Remove from faces array so we don't re-pick
    images.splice(randomIndex, 1);
  }
  const shuffled = shuffleArray(faces);
  return shuffled;
};

const getTileGrid = ({ rows, cols }: RowColProps) => {
  const tileGrid: TileProps[][] = [];
  const faces = getFaces({
    rows,
    cols,
  });
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!tileGrid[i]) {
        tileGrid[i] = [];
      }
      tileGrid[i].push({
        id: uuid(),
        x: j,
        y: i,
        face: faces.pop()!,
        isFaceUp: false,
        isDiscover: false,
      });
    }
  }
  return tileGrid;
};

type TileProps = {
  id: string;
  x: number;
  y: number;
  face: Face;
  isFaceUp: boolean;
  isDiscover: boolean;
};

type TilePropsEvent = {
  isLimit: boolean;
  onFacePress: (x: number, y: number, isFacingUp: boolean, faceId: string) => void;
};

const Tile = ({
  x,
  y,
  face,
  isFaceUp,
  isDiscover,
  onFacePress,
  isLimit,
}: TileProps & TilePropsEvent) => {
  const styles = useStyles();

  const background =
    isFaceUp || isDiscover ? (
      <StyledImage source={face.source} style={styles.tileFace} />
    ) : (
      <View style={styles.tilePlaceholder}>
        <QuestionIcon />
      </View>
    );

  return (
    <StyledPressable
      style={styles.tileContainer}
      onPress={() => onFacePress(x, y, isFaceUp, face.faceId)}
      disabled={(!isFaceUp && isLimit) || isDiscover}>
      {background}
    </StyledPressable>
  );
};

const MatchFood = () => {
  const styles = useStyles();
  const router = useRouter();
  const { theme } = useTheme();
  const [currentFaceUp, setCurrentFaceUp] = useState<
    Array<Pick<TileProps, 'x' | 'y'> & Pick<Face, 'faceId'>>
  >([]);
  const [currentLife, setCurrentLife] = useState(MAX_LIFE);
  const [tileGrid, setTileGrid] = useState(
    getTileGrid({
      rows: ROWS,
      cols: COLS,
    }),
  );
  const [soundOn, setSoundOn] = useState(true);
  const { playSound: playFlipSound } = useSound(
    require('../../../../assets/sound/flip-sound-1.mp3'),
  );
  const { playSound: playMatchSound } = useSound(
    require('../../../../assets/sound/sparkle-sound.mp3'),
  );
  const { playSound: playNotMatchSound } = useSound(
    require('../../../../assets/sound/wrong-answer-sound.wav'),
  );
  const reset = () => {
    setTileGrid(
      getTileGrid({
        rows: ROWS,
        cols: COLS,
      }),
    );
    setCurrentFaceUp([]);
    setCurrentLife(MAX_LIFE);
  };

  const onFacePress: TilePropsEvent['onFacePress'] = (x, y, isFacingUp, faceId) => {
    if (soundOn) {
      playFlipSound();
    }

    if (
      (currentFaceUp.length < FACE_UP_LIMIT && !isFacingUp) ||
      (currentFaceUp.length == FACE_UP_LIMIT - 1 && isFacingUp) ||
      (currentFaceUp.length == FACE_UP_LIMIT && isFacingUp)
    ) {
      setTileGrid(prev => {
        const copy = Array.from(prev);
        copy[y][x] = {
          ...copy[y][x],
          isFaceUp: !copy[y][x].isFaceUp,
        };
        return copy;
      });
      setCurrentFaceUp(prev => {
        if (!isFacingUp) {
          return [
            ...prev,
            {
              x,
              y,
              faceId,
            },
          ];
        }
        return prev.filter(tile => tile.x !== x || tile.y !== y);
      });
    }
  };

  useEffect(() => {
    if (currentFaceUp.length === 2) {
      const firstX = currentFaceUp[0].x;
      const firstY = currentFaceUp[0].y;
      const secondX = currentFaceUp[1].x;
      const secondY = currentFaceUp[1].y;

      if (currentFaceUp[0].faceId === currentFaceUp[1].faceId) {
        setTileGrid(prev => {
          const copy = Array.from(prev);
          copy[firstY][firstX] = {
            ...copy[firstY][firstX],
            isDiscover: true,
          };
          copy[secondY][secondX] = {
            ...copy[secondY][secondX],
            isDiscover: true,
          };
          return copy;
        });
        if (soundOn) {
          playMatchSound();
        }
        setCurrentFaceUp([]);
      } else {
        setTimeout(() => {
          setCurrentLife(prev => (prev > 0 ? prev - 1 : 0));
          if (soundOn) {
            playNotMatchSound();
          }
        }, 500);
        setTimeout(() => {
          setTileGrid(prev => {
            const copy = Array.from(prev);
            copy[firstY][firstX] = {
              ...copy[firstY][firstX],
              isFaceUp: false,
            };
            copy[secondY][secondX] = {
              ...copy[secondY][secondX],
              isFaceUp: false,
            };
            return copy;
          });
          setCurrentFaceUp([]);
        }, 1000);
      }
    }
  }, [currentFaceUp.length]);

  useEffect(() => {
    if (currentLife == 0) {
      Alert.alert(
        i18n.t('games.lose'),
        i18n.t('games.wannaPlayAgain'),
        [
          {
            isPreferred: false,
            onPress: () => router.back(),
            style: 'destructive',
            text: i18n.t('games.quit'),
          },
          {
            isPreferred: true,
            onPress: reset,
            style: 'default',
            text: i18n.t('games.retry'),
          },
        ],
        {
          cancelable: false,
          userInterfaceStyle: theme.mode === 'dark' ? 'dark' : 'light',
        },
      );
    }
  }, [currentLife]);

  useEffect(() => {
    if (tileGrid.every(row => row.every(tile => tile.isDiscover))) {
      Alert.alert(
        i18n.t('games.win'),
        i18n.t('games.wannaPlayAgain'),
        [
          {
            isPreferred: false,
            onPress: () => router.back(),
            style: 'destructive',
            text: i18n.t('games.quit'),
          },
          {
            isPreferred: true,
            onPress: reset,
            style: 'default',
            text: i18n.t('games.playAgain'),
          },
        ],
        {
          cancelable: false,
          userInterfaceStyle: theme.mode === 'dark' ? 'dark' : 'light',
        },
      );
    }
  }, [tileGrid]);

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <GameHeaderRight
              soundOn={soundOn}
              onSoundPress={() => setSoundOn(prev => !prev)}
              onResetPress={reset}
            />
          ),
          headerTitle: () => {
            return (
              <View style={styles.lifeContainer}>
                {/* {Array(currentLife)
                  .fill(0)
                  .map((_, i) => {
                    return <AntDesign name='heart' style={styles.lifeIcon} key={i} />;
                  })} */}
                <StyledText type='Heading_4' color='orange'>
                  {currentLife}
                </StyledText>
                <LifeIcon />
              </View>
            );
          },
        }}
      />
      <StyledDivider orientation='horizontal' />
      <View style={styles.gameContainer}>
        {tileGrid.map((row, i) => {
          return (
            <View style={styles.rowContainer} key={i}>
              {row.map(tile => {
                return (
                  <Tile
                    {...tile}
                    key={tile.id}
                    onFacePress={onFacePress}
                    isLimit={currentFaceUp.length == FACE_UP_LIMIT}
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    </>
  );
};

export default MatchFood;

const useStyles = makeStyles(theme => {
  const dT = theme.mode === 'dark';

  return {
    lifeContainer: {
      gap: STYLES.GAP.GAP_4,
      flexDirection: 'row',
      alignItems: 'center',
    },
    lifeIcon: {
      fontSize: STYLES.FONT_SIZE.FONT_SIZE_24,
      color: theme.colors.orange,
    },
    gameContainer: {
      flex: 1,
      gap: STYLES.GAP.GAP_16,
      backgroundColor: dT ? theme.colors.black : theme.colors.white,
      padding: STYLES.PADDING.PADDING_16,
    },
    rowContainer: {
      gap: STYLES.GAP.GAP_16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    tileContainer: {
      flex: 1,
      height: hp(15),
      position: 'relative',
      paddingHorizontal: 0,
      paddingVertical: 0,
      backgroundColor: 'white',
      borderRadius: STYLES.RADIUS.RADIUS_10,
      ...(dT ? STYLES.SHADOW.SHADOW_WHITE_8 : STYLES.SHADOW.SHADOW_BLACK_8),
    },
    tilePlaceholder: {
      flex: 1,
      backgroundColor: theme.colors.orange,
      borderRadius: STYLES.RADIUS.RADIUS_10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tileFace: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: STYLES.RADIUS.RADIUS_10,
    },
  };
});
