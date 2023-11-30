import { useState } from 'react';
import { Text, View } from 'react-native';
import { Stack } from 'expo-router';
import StyledDivider from '@/components/Styled/StyledDivider';
import { GameHeaderRight } from '@/components/Styled/StyledHeader';
import { ThemeConsumer, makeStyles } from '@rneui/themed';
import { QuestionIcon } from '@/components/Icon';
import { hp } from '@/lib/utils';
import StyledText from '@/components/Styled/StyledText';
import { STYLES } from '@/lib/constants';

type TileProps = {
  x: number;
  y: number;
};
const Tile = ({ x, y }: TileProps) => {
  const styles = useStyles();

  return (
    <View style={styles.tileContainer}>
      <StyledText>
        {x},{y}
      </StyledText>
      <QuestionIcon />
    </View>
  );
};

type MatchFoodGameProps = {
  rows: number;
  cols: number;
};

const MatchFoodGame = ({ rows, cols }: MatchFoodGameProps) => {
  const styles = useStyles();
  const [tileGrid] = useState(() => {
    const tileGrid: TileProps[][] = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const tile: TileProps = { x: j, y: i };
        if (!tileGrid[i]) {
          tileGrid[i] = [];
        }
        tileGrid[i].push(tile);
      }
    }
    return tileGrid;
  });

  return (
    <View style={styles.gameContainer}>
      {tileGrid.map((row, i) => {
        return (
          <View style={styles.rowContainer} key={i}>
            {row.map((tile, j) => {
              return <Tile {...tile} key={(i + 1) * (j + 1)} />;
            })}
          </View>
        );
      })}
    </View>
  );
};

const MatchFood = () => {
  const styles = useStyles();
  const [soundOn, setSoundOn] = useState(true);
  const reset = () => {};

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
        }}
      />
      <StyledDivider orientation='horizontal' />
      <View>
        <Text>MatchFood</Text>
      </View>
      <MatchFoodGame rows={5} cols={4} />
    </>
  );
};

export default MatchFood;

const useStyles = makeStyles(theme => {
  const dT = theme.mode === 'dark';

  return {
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
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.orange,
      borderRadius: STYLES.RADIUS.RADIUS_20,
    },
  };
});
