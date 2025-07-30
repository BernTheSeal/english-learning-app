import userWordRepository from "../userWord/userWord.repository";
import notificationRepository from "./notification.repository";
import { createNotificationInput } from "./notification.input";
import { NotificationMetaMap } from "./notification.type";

const sendCustomNotification = async <T extends keyof NotificationMetaMap>({
  userId,
  title,
  message,
  type,
  meta,
}: createNotificationInput<T>) => {
  await notificationRepository.create({ userId, type, title, message, meta });
};

const getNotification = async (userId: string, notificationId?: string) => {
  if (notificationId) {
    return await notificationRepository.getByUserIdAndNotificationId(
      userId,
      notificationId
    );
  }
  return await notificationRepository.getByUserId(userId);
};

const sendTrackNotification = async (userId: string) => {
  const promotableWords = await userWordRepository.getWordsReadyForStatusUpgrade(userId);
  let count = promotableWords.length;

  if (count === 0) {
    return;
  }

  const title = `How about upgrading the level of ${count} word${count > 1 ? "s" : ""}?`;
  const message = "";

  const trackNotification = await notificationRepository.getTrackTypeByUserId(userId);

  if (!trackNotification || trackNotification.isSeen) {
    await notificationRepository.create({
      userId,
      type: "track",
      title,
      message,
      meta: promotableWords,
    });
  }

  if (trackNotification && !trackNotification.isSeen) {
    const oldMeta = trackNotification.meta || [];
    const currentMeta = promotableWords;

    const updatedOldMeta = oldMeta.map((oldItem) => {
      const updatedItem = currentMeta.find((newItem) => newItem.word === oldItem.word);
      return updatedItem ? updatedItem : oldItem;
    });

    const newItems = currentMeta.filter(
      (newItem) => !oldMeta.some((oldItem) => oldItem.word === newItem.word)
    );

    const newMeta = [...updatedOldMeta, ...newItems];

    await notificationRepository.updateMetaById(
      trackNotification._id.toString(),
      newMeta
    );
  }
};

export default {
  sendCustomNotification,
  getNotification,
  sendTrackNotification,
};
