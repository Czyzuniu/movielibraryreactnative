import {Button, useTheme, useToast} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import {useTranslation} from "react-i18next";
import {useGetMovieStateQuery, useToggleFavouriteMutation} from "../../../../redux/services/movies";
import {useAppSelector} from "../../../../redux/hooks/hooks";

type Props = {
  movieId: number
  type: 'movie' | 'tv'
}

export default function ToggleAsFavouriteButton({ movieId, type }: Props) {
  const accountId = useAppSelector(state => state.session.user.username)
  const {t} = useTranslation('viewMovie');
  const {colors} = useTheme()
  const [toggleFavourite, {isLoading: isLoadingMutation}] = useToggleFavouriteMutation();
  const { data, isLoading: isLoadingState } = useGetMovieStateQuery(movieId.toString())
  const toast = useToast();
  const isFavourite = data?.favorite === true

  const onMarkAsFavourite = async () => {
    const MOVIE_ADDED_TO_FAVOURITES_TOAST_ID = 'MOVIE_ADDED_TO_FAVOURITES';
    try {
      await toggleFavourite({
        accountId,
        movieId,
        type,
        isFavourite: !isFavourite
      }).unwrap()

      if (!toast.isActive(MOVIE_ADDED_TO_FAVOURITES_TOAST_ID)) {
        toast.show({
          id: MOVIE_ADDED_TO_FAVOURITES_TOAST_ID,
          backgroundColor: 'green.500',
          description: isFavourite ? t('RemovedFromFavourites') : t('AddedToFavourites')
        })
      }
    } catch (e) {
      toast.show({
        id: MOVIE_ADDED_TO_FAVOURITES_TOAST_ID,
        backgroundColor: 'danger.500',
        color: 'red',
        description: "ProblemAddingOrRemovingFromFavourite"
      })
    }
  }

  return (
    <Button
      margin={2}
      variant={'solid'}
      isLoading={isLoadingState || isLoadingMutation}
      spinnerPlacement={'end'}
      rightIcon={<Icon name={'heart'} color={isFavourite ? colors.red['600'] : 'white'} />}
      colorScheme={'blueGray'}
      onPress={onMarkAsFavourite}
    >
      {t(isFavourite ? 'RemoveFromFavourites' : 'AddToFavourites')}
    </Button>
  )
}
