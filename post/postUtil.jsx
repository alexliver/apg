import React from 'react';
import Avatar from 'material-ui/Avatar';

export function getUserTitle(user) {
  if (user.is_superuser)
    return "the supreme leader";
  return 'pleb';
}

export function getUserAvatar(user) {
  if (user.avatar)
    return user.avatar.image;
  return <Avatar>{user.username[0]}</Avatar>;
}
