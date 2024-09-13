import React from 'react';
import {Box, Card, CardContent, CardMedia, styled, Typography} from '@mui/material';
import {apiURL} from '../../../constants';

interface Props {
  title: string;
  date: number;
  image: string | null;
  onClick: () => void;
}

const AlbumCard: React.FC<Props> = ({title, date, image, onClick}) => {
  const ImageCardMedia = styled(CardMedia)({
    height: '100%',
    width: 100,
    objectFit: 'cover',
  });

  const cardImage = image ? apiURL + '/' + image : '';

  return (
    <Card onClick={onClick}
          sx={{
            display: 'flex',
            width: 300,
            height: 100,
            m: 1,
            cursor: 'pointer',
            '&:hover': {
              boxShadow: 6,
              transform: 'scale(1.03)',
            },
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}>
      <Box sx={{display: 'flex', flexDirection: 'row', width: '100%'}}>
        <Box sx={{display: 'flex', flexDirection: 'column', flex: 1}}>
          <CardContent sx={{backgroundColor: '#fafafa', height: '100%'}}>
            <Typography component="div" variant="h6" noWrap>
              {title}
            </Typography>
            <Typography variant="subtitle2" component="div" sx={{color: 'text.secondary'}}>
              {date}
            </Typography>
          </CardContent>
        </Box>
        {image && <ImageCardMedia image={cardImage}/>}
      </Box>
    </Card>
  );
};

export default AlbumCard;
