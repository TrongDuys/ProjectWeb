import { patchDataAPI } from "../../api/fetchData";
import { imageUpload } from "../../until/imageUpload";
import { GLOBALTYPES } from "./GlobalTypes";



export const updateProfileUser =
({ userData, avatar, auth }) =>
async (dispatch) => {
  if (!userData.firstname)
    return dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: 'Please add your first name',
      },
    });

  if (userData.firstname.length > 20)
    return dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: 'Your full name too long',
      },
    });

  if (userData.story.length > 200)
    return dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: 'Your story too long',
      },
    });

  try {
    let media;
    if (avatar) media = await imageUpload([avatar]);
    const res = await patchDataAPI(
      'user',
      {
        ...userData,
        avatar: avatar ? media[0].url : auth.user.avatar,
        id: auth.user._id,
      },
    );
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          ...userData,
          avatar: avatar ? media[0].url : auth.user.avatar,
        },
      },
    });
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};