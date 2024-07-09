import { useCallback, useEffect, useState } from "react";
import { usePsychologists } from "../../hooks/usePsychologists";
import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";

import { toast } from "react-toastify";
import Modal from "../Modal/Modal";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";
import { Icon } from "../Icon/Icon";
import { UniversalBtn } from "../UniversalBtn/UniversalBtn";
import { ReviewList } from "../ReviewList/ReviewList";
import { ModalContentWrapper } from "../ModalContentWrapper/ModalContentWrapper";
import { AppointmentForm } from "../AppointmentForm/AppointmentForm";

import { ICON_CLASSES } from "../../constants/iconConstants";
import { ACTION_OPTIONS } from "../../constants/actionOptionsConstants";
import { FAVORITE_FOR_USERS_KEY } from "../../constants/firebase";

import css from "./PsychologistsItem.module.css";

export const PsychologistsItem = ({ item }) => {
  const {
    about,
    avatar_url,
    experience,
    initial_consultation,
    license,
    name,
    price_per_hour,
    rating,
    reviews,
    specialization,
  } = item;

  const { isLoggedIn, user } = useAuth();
  const { addToFavorites, removeFromFavorites, isPsychologistsLoading } =
    usePsychologists();

  const [showReadMore, setShowReadmore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [actionOption, setActionOption] = useState({});
  const { pathname } = useLocation();

  const checkIsFavorite = useCallback(() => {
    if (pathname === "/psychologists") {
      if (
        !Object.hasOwn(item, FAVORITE_FOR_USERS_KEY) ||
        !Object.hasOwn(item[FAVORITE_FOR_USERS_KEY], user.uid)
      ) {
        return false;
      } else {
        return item[FAVORITE_FOR_USERS_KEY][user.uid];
      }
    }
    if (pathname === "/favorites") {
      return true;
    }
  }, [item, pathname, user]);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setIsFavorite(false);
      return;
    }

    setIsFavorite(checkIsFavorite());
  }, [checkIsFavorite, isLoggedIn]);

  const handleFavoriteClick = async () => {
    if (!isLoggedIn) {
      setActionOption(ACTION_OPTIONS.noAuthAlert);
      setShowModal(true);
      return;
    }

    const favoritesDbSubPath = `${user.uid}/${item.key}`;
    const psychologistsDbSubPath = `${item.key}/${FAVORITE_FOR_USERS_KEY}/${user.uid}`;

    if (!isFavorite) {
      try {
        await addToFavorites({
          favoritesDbDocLink: { [favoritesDbSubPath]: item },
          psychologistsDbDocLink: { [psychologistsDbSubPath]: true },
          key: item.key,
          uid: user.uid,
        });
      } catch (error) {
        toast.error(`Sorry, unable add to favorites ${error.message}`);
      }
    } else {
      try {
        await removeFromFavorites({
          psychologistsDbDocLink: psychologistsDbSubPath,
          favoritesDbDocLink: favoritesDbSubPath,
          key: item.key,
          uid: user.uid,
        });
      } catch (error) {
        toast.error(`Sorry, unable remove from favorites ${error.message}`);
      }
    }
  };

  const handleReadMoreClick = () => {
    setShowReadmore(!showReadMore);
  };

  const handleAppointmentClick = () => {
    setActionOption(ACTION_OPTIONS.makeAppointment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const details = [
    { detailName: "Experience", detailValue: experience },
    { detailName: "License", detailValue: license },
    { detailName: "Specialization", detailValue: specialization },
    { detailName: "Initial_consultation", detailValue: initial_consultation },
  ];

  return (
    <div className={css.item}>
      <div className={css.imgWrapper}>
        <img src={avatar_url} alt={name} width={96} className={css.img} />
      </div>

      <div className={css.content}>
        <div className={css.topWrapper}>
          <div>
            <p className={css.profession}>Psychologist</p>
            <h2 className={css.name}>{name}</h2>
          </div>
          <div className={css.ratingPriceFavoriteWrapper}>
            <div className={css.ratingPriceWrapper}>
              <p className={css.ratingWrapper}>
                <Icon
                  className={ICON_CLASSES.classStar}
                  iconName="icon-star"
                  width={16}
                />
                <span className={css.ratingText}>{`Rating: ${rating}`}</span>
              </p>
              <span className={css.divider}></span>
              <p className={css.priceWrapper}>
                Price / 1 hour:
                <span className={css.priceValue}>{` ${price_per_hour}$`}</span>
              </p>
            </div>

            <FavoriteButton
              isLoading={isPsychologistsLoading}
              isFavorite={isFavorite}
              onClick={handleFavoriteClick}
            />
          </div>
        </div>

        <ul className={css.detailList}>
          {details.map(({ detailName, detailValue }) => (
            <li key={detailName} className={css.detailItem}>
              <span className={css.detailName}>{detailName}: </span>
              {detailValue}
            </li>
          ))}
        </ul>

        <p className={css.about}>{about}</p>

        {!showReadMore && (
          <button className={css.readMoreBtn} onClick={handleReadMoreClick}>
            Read more
          </button>
        )}

        {showReadMore && (
          <>
            <div className={css.reviewsWrapper}>
              <ReviewList reviews={reviews} />
            </div>

            <UniversalBtn onClick={handleAppointmentClick} width={227}>
              {ACTION_OPTIONS.makeAppointment.title
                .split(" ")
                .slice(0, 3)
                .join(" ")}
            </UniversalBtn>
          </>
        )}
      </div>

      {showModal &&
        actionOption.type === ACTION_OPTIONS.makeAppointment.type && (
          <Modal onClose={handleCloseModal}>
            <ModalContentWrapper
              actionOption={actionOption}
              onClose={handleCloseModal}
            >
              <AppointmentForm psychologist={item} />
            </ModalContentWrapper>
          </Modal>
        )}

      {showModal && actionOption.type === ACTION_OPTIONS.noAuthAlert.type && (
        <Modal onClose={handleCloseModal}>
          <ModalContentWrapper
            actionOption={actionOption}
            onClose={handleCloseModal}
          ></ModalContentWrapper>
        </Modal>
      )}
    </div>
  );
};
