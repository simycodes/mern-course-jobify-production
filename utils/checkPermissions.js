import { UnAuthenticatedError } from '../errors/index.js';

const checkPermissions = (requestUser, resourceUserId) => {
  // IF ITS ADMIN TRYING TO UPDATE OR DELETE JOB - LET ADMIN DO THAT
  // if (requestUser.role === 'admin') return
  // IF USER IS UPDATING HIS OWN CREATED JOB - LET USER DO THAT ELSE THROW AUTHENTICATION ERROR
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new UnauthorizedError('Not authorized to access this route');
};

export default checkPermissions;