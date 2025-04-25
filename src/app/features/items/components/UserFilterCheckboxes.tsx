// MUI
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

// API Connections
import { User } from '../../users/users-api';

interface Props {
  users: User[];
  authenticatedUserId?: string;
  selectedUserIds: string[];
  onChange: (userId: string) => void;
}

const UserFilterCheckboxes = ({
  users,
  authenticatedUserId,
  selectedUserIds,
  onChange,
}: Props): React.JSX.Element => {
  const sortedUsers = users.slice().sort((a, b) => {
    if (a.id === authenticatedUserId) return -1;
    if (b.id === authenticatedUserId) return 1;
    return 0;
  });

  return (
    <FormControl component='fieldset' sx={{ mb: 2 }}>
      <FormLabel component='legend'>Filter by users</FormLabel>
      <FormGroup>
        {sortedUsers.map((user) => (
          <FormControlLabel
            key={user.id}
            control={
              <Checkbox
                checked={selectedUserIds.includes(user.id)}
                onChange={() => onChange(user.id)}
              />
            }
            label={user.id === authenticatedUserId ? 'Me' : user.name}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default UserFilterCheckboxes;
