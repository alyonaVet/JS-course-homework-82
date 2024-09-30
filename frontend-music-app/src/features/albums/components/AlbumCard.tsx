import React from 'react';
import {Box, Button, Card, CardContent, CardMedia, Stack, styled, Typography} from '@mui/material';
import {apiURL} from '../../../constants';
import {User} from '../../../types';

interface Props {
  id: string;
  title: string;
  date: number;
  image: string | null;
  user: User | null;
  isPublished: boolean;
  onClick: () => void;
  onToggle: VoidFunction;
  onDelete: VoidFunction;
  isToggling: boolean;
  isDeleting: boolean;
}

const AlbumCard: React.FC<Props> = ({
                                      title,
                                      date,
                                      image,
                                      user,
                                      isPublished,
                                      onClick,
                                      onToggle,
                                      onDelete,
                                      isToggling,
                                      isDeleting
                                    }) => {

  const ImageCardMedia = styled(CardMedia)({
    height: '100%',
    width: 100,
    objectFit: 'cover',
  });

  const cardImage = image ? apiURL + '/' + image : '';

  return (
    <Box sx={{mb: 2}}>
      {user && user.role === 'admin' &&
        (<Stack direction="row" justifyContent="space-between" mb={2}>
            <Button color={isPublished ? 'success' : 'error'}
                    onClick={onToggle} disabled={isToggling}>{isPublished ? 'Published' : 'Unpublished'}</Button>
            <Button type="submit" variant="outlined" color="error" sx={{mr: 1}} onClick={onDelete}
                    disabled={isDeleting}>Delete</Button>
          </Stack>
        )}
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
    </Box>
  );
};

export default AlbumCard;
