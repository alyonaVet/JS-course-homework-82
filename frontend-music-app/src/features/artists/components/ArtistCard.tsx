import React from 'react';
import {Box, Card, CardActionArea, CardContent, CardMedia, styled, Typography} from '@mui/material';
import {apiURL} from '../../../constants';

interface Props {
  name: string;
  image?: string;
}

const ArtistCard: React.FC<Props> = ({name, image}) => {
  const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '100%',
    objectFit: 'cover',
  });

  const cardImage = image ? apiURL + '/' + image : '';

  return (
    <Card sx={{width: 300, m: 1}}>
      <CardActionArea>
        {image ? (
          <ImageCardMedia image={cardImage} />
        ) : (
          <Box sx={{ height: 0, paddingTop: '100%', backgroundColor: '#fafafa' }} />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" textAlign="center">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ArtistCard;