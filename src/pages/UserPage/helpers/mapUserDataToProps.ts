import { Indexed } from '../../../framework/Store';

export function mapUserDataToProps(state: Indexed) {
  return {
    firstName: state.user.first_name,
  };
}
