// Redecalare forwardRef
declare module 'react' {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

import { forwardRef, ForwardedRef } from 'react';
import { View, FlatList, FlatListProps } from 'react-native';
import StyledText from '@/components/Styled/StyledText';
import { STYLES } from '@/lib/constants';

export type StyledFlatListProps<T> = FlatListProps<T> & {
  emptyTitle: string;
};

export const StyledFlatListWithRef = <T,>(
  props: StyledFlatListProps<T>,
  ref: ForwardedRef<FlatList<T>>,
) => {
  const { data, contentContainerStyle, emptyTitle, ...otherProps } = props;

  return (
    <FlatList
      ref={ref}
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
      style={{
        flexGrow: data?.length === 0 ? 1 : 0,
      }}
      data={data}
      {...otherProps}
    />
  );
};

export const StyledFlatList = forwardRef(StyledFlatListWithRef);

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
