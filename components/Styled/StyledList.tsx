import { View, FlatList, FlatListProps } from 'react-native';
import StyledText from '@/components/Styled/StyledText';
import { STYLES } from '@/lib/constants';

export type StyledFlatListProps<T> = FlatListProps<T> & {
  emptyTitle: string;
};

export const StyledFlatList = <T,>(props: StyledFlatListProps<T>) => {
  const { data, contentContainerStyle, emptyTitle, ...otherProps } = props;

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={ListSeparator}
      ListEmptyComponent={() => <EmptyList title={emptyTitle} />}
      contentContainerStyle={[
        {
          ...(data?.length === 0 ? { flex: 1 } : {}),
          paddingVertical: STYLES.PADDING.PADDING_8,
          paddingHorizontal: STYLES.PADDING.PADDING_16,
        },
        contentContainerStyle,
      ]}
      data={data}
      {...otherProps}
    />
  );
};

export const ListSeparator = () => {
  return (
    <View
      style={{
        marginTop: STYLES.MARGIN.MARGIN_16,
      }}
    />
  );
};

type EmptyListProps = {
  title: string;
  subField?: React.ReactNode;
};

export const EmptyList = ({ title, subField }: EmptyListProps) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StyledText
        type='Heading_3'
        color='whiteGrey'
        style={{
          textAlign: 'center',
          textAlignVertical: 'top',
        }}>
        {title}
      </StyledText>
      {subField}
    </View>
  );
};
