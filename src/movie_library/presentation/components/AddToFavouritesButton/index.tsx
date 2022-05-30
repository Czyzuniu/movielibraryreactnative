import {Button, useTheme, useToast} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import {useTranslation} from "react-i18next";
import {useAddToFavouritesMutation} from "../../../../redux/services/movies";
import {useAppSelector} from "../../../../redux/hooks/hooks";

type Props = {
  movieId: number
  type: 'movie' | 'tv'
}

export default function AddToFavouritesButton({ movieId, type }: Props) {
  const accountId = useAppSelector(state => state.session.user.username)
  const {t} = useTranslation('viewMovie');
  const {colors} = useTheme()
  const [addToFavourites, {isLoading}] = useAddToFavouritesMutation();
  const toast = useToast();

  return (
    <Button
      margin={2}
      variant={'solid'}
      isLoading={isLoading}
      spinnerPlacement={'end'}
      rightIcon={<Icon name={'heart'} color={colors.red['600']}/>}
      colorScheme={'blueGray'}
      onPress={() => addToFavourites({
        accountId,
        movieId,
        type
      }).unwrap().then(() => {
        toast.show({
          backgroundColor: 'green.500',
          description: "Added to favourites!"
        })
      }).catch((e) => {
        toast.show({
          backgroundColor: 'danger.500',
          color: 'red',
          description: "There was a problem adding a movie to your favourites..."
        })
        console.error(e)
      })}
    >
      {t('AddToFavourites')}
    </Button>
  )
}
