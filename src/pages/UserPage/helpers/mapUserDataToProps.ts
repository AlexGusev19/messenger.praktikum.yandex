import { IStateStructure } from '../../../framework/Store';

export function mapUserDataToProps(state: IStateStructure) {
  return {
    firstName: state.user?.first_name,
  };
}
