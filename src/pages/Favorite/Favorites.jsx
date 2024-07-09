import { useEffect, useState } from "react";
import { usePsychologists } from "../../hooks/usePsychologists";
import { useFilter } from "../../hooks/useFilter";
import { useAuth } from "../../hooks/useAuth";

import { Filter } from "../../Components/Filter/Filter";
import { PsychologistsList } from "../../Components/PsychologistsList/PsychologistsList";
import { toast } from "react-toastify";
import { endAt, startAt } from "firebase/database";
import { FILTER_OPTIONS, SORT_ORDER } from "../../constants/filterConstants";
import { UniversalBtn } from "../../Components/UniversalBtn/UniversalBtn";
import { Loader } from "../../Components/Loader/Loader";
import { Empty } from "../../Components/Empty/Empty";

import css from "./Favorites.module.css";

const Favorites = () => {
  const [queryConstraint, setQueryConstraint] = useState([]);
  const [shouldGetItems, setShouldGetItems] = useState(true);
  const { user } = useAuth();

  const {
    favoritesItems,
    isPsychologistsLoading,
    nextKey,
    nextValue,
    getFavorites,
    resetPsychologists,
  } = usePsychologists();

  const { selectedFilter } = useFilter();

  useEffect(() => {
    const getData = async () => {
      try {
        await getFavorites({ uid: user.uid, queryConstraint });
        setShouldGetItems(false);
      } catch (error) {
        toast.error(`Ooops, something went wrong! ${error.message}`);
      }
    };

    if (shouldGetItems && queryConstraint.length > 0) {
      getData();
    }
  }, [getFavorites, queryConstraint, shouldGetItems, user]);

  useEffect(() => {
    if (!nextKey) return;

    const constraintParams =
      FILTER_OPTIONS[selectedFilter].sortOrder === SORT_ORDER.asc
        ? FILTER_OPTIONS[selectedFilter].key
          ? [startAt(nextValue, nextKey)]
          : [startAt(nextKey)]
        : FILTER_OPTIONS[selectedFilter].key
        ? [endAt(nextValue, nextKey)]
        : [endAt(nextKey)];

    setQueryConstraint([
      ...FILTER_OPTIONS[selectedFilter].queryConstraint,
      ...constraintParams,
    ]);
  }, [nextKey, nextValue, selectedFilter]);

  useEffect(() => {
    resetPsychologists();
    const newQueryConstraint = FILTER_OPTIONS[selectedFilter]
      .additionalQueryConstraint
      ? [
          ...FILTER_OPTIONS[selectedFilter].queryConstraint,
          ...FILTER_OPTIONS[selectedFilter].additionalQueryConstraint,
        ]
      : [...FILTER_OPTIONS[selectedFilter].queryConstraint];

    setQueryConstraint(newQueryConstraint);
    setShouldGetItems(true);
  }, [resetPsychologists, selectedFilter]);

  const handleLoadMore = () => {
    setShouldGetItems(true);
  };

  const items = favoritesItems;

  return (
    <section className={css.section}>
      <div className="container">
        <h2 className="visually-hidden">Favorites</h2>
        <Filter />
        {items.length > 0 && <PsychologistsList items={items} />}

        {!isPsychologistsLoading && !items.length && <Empty />}
        {isPsychologistsLoading && !items.length && <Loader />}
        {nextKey && (
          <div className={css.btnWrapper}>
            <UniversalBtn
              onClick={handleLoadMore}
              isLoading={isPsychologistsLoading}
              width={176}
            >
              Load more
            </UniversalBtn>
          </div>
        )}
      </div>
    </section>
  );
};

export default Favorites;
