import React, { useEffect, useState } from "react";
import { FavoriteMutation, SortParamType, Stock } from "../../types";
import DarkmodeToggle from "../components/DarkmodeToggle";
import Loader from "../components/Loader";
import LoginButton from "../components/LoginButton";
import SearchForm from "../components/SearchForm";
import ShowFavoriteStocksToggle from "../components/ShowFavoriteStocksToggle";
import StocksList from "../components/StocksList";
import SortDropdown from "../components/SortDropdown";
import useSWRMutation from "swr/mutation";
import { useSession } from "next-auth/react";
import useLocalStorageState from "use-local-storage-state";
import InfiniteScroll from "react-infinite-scroll-component";
import sortStocksList from "../utils/SortUtils";
import usePagination from "../utils/usePagination";

export default function Home() {
  const { data: session } = useSession();
  // const currentUser = session?.user.name;
  const currentUser = session?.user?.name ?? null;

  const [theme, setTheme] = useLocalStorageState<string | null>("theme", {
    defaultValue: setThemeToUserSystemTheme(),
  });

  const [isShowFavoriteStocks, setIsShowFavoriteStocks] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortParam, setSortParam] = useState<SortParamType>({
    // TS: Yair
    sortBy: "ticker",
    sortDirection: "ascending",
  });

  const {
    isLoadingMore,
    isReachingEnd,
    error,
    paginatedData: paginatedStocks,
    // stocks,
    size,
    setSize,
  } = usePagination<Stock>("/api/stocks", searchQuery);

  // @patchrequest, step3
  const { trigger } = useSWRMutation(
    `/api/stocks`,
    updateFavoriteStockToggle // sendRequest
  );

  // dark mode start
  function setThemeToUserSystemTheme() {
    if (typeof window !== "undefined") {
      if (window.matchMedia("(prefers-color-scheme: dark").matches) {
        return "dark";
      }
      return "light";
    }
  }

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [theme]);

  function handleThemeSwitch() {
    setTheme(theme === "dark" ? "light" : "dark");
  }
  // dark mode end

  // @patchrequest, step2
  async function updateFavoriteStockToggle(
    url: string,
    { arg }: { arg: object }
  ) {
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(arg),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      await response.json();
    } else {
      console.error(`Error (Response not ok): ${response.status}`);
      console.error(response);
    }
  }

  if (error) return <h1>Something went wrong!</h1>;
  if (!paginatedStocks) return <Loader />;

  paginatedStocks && console.log({ paginatedStocks, size });

  function handleSort(event: React.ChangeEvent<HTMLSelectElement>): void {
    const sortOption = event.target;
    const sortOptionValues = sortOption.value.split("-");
    setSortParam({
      sortBy: sortOptionValues[0] as "ticker", // TS: Yair
      sortDirection: sortOptionValues[1] as "ascending", // TS: Yair
    });
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>): void {
    // event.preventDefault();
    setSearchQuery(event.target.value);
  }

  function mutateFavoriteData( // Yair
    currentData: Stock[],
    mutation: FavoriteMutation
  ) {
    const stockToUpdate = currentData?.find(
      (stock) => stock._id === mutation.id
    );
    const mutatedStock = { ...stockToUpdate }; // copy stockToUpdate

    if (mutatedStock.Favorites?.includes(mutation.Favorites)) {
      mutatedStock.Favorites = mutatedStock.Favorites.filter(
        (userId) => userId !== mutation.Favorites
      );
    } else {
      mutatedStock.Favorites = [
        ...(mutatedStock.Favorites as string[]), // TS: Yair
        mutation.Favorites,
      ];
    }

    return currentData.map((stock) =>
      stock._id === mutatedStock._id ? mutatedStock : stock
    );
  }

  // @patchrequest, step1
  async function handleToggleFavorite(
    stockId: string,
    userId: string
  ): Promise<void> {
    //
    const favoriteData = {
      id: stockId,
      Favorites: userId,
    };

    await trigger(favoriteData, {
      // optimisticData updates UI instantly and mutates db (afterwards) in the background
      optimisticData: (currentData) => {
        return mutateFavoriteData(
          currentData as unknown as Stock[], // TS: Yair
          favoriteData
        );
      },
      rollbackOnError: true, // if db mutation fails, rollback local changes
    });
  }

  sortStocksList(paginatedStocks, sortParam.sortBy, sortParam.sortDirection);

  return (
    <>
      <header className="fixed top-0 z-10 flex flex-col w-full bg-accent-4 bg-opacity-90 p-4 pb-2">
        <div className="flex flex-wrap justify-center sm:justify-between items-center">
          <h1 className="font-serif font-black italic text-4xl sm:text-5xl md:text-6xl text-customcontentcolor mr-4">
            Ursula
          </h1>
          <div className="flex items-center m-2 ml-4">
            <LoginButton />
            <DarkmodeToggle
              onClick={() => {
                handleThemeSwitch();
              }}
              theme={theme}
            />
          </div>
        </div>
        <div className="flex flex-col-reverse items-center sm:flex-row sm:flex-wrap-reverse sm:items-center sm:justify-center mt-2">
          {/* <SortDropdown onSort={handleSort} /> */}
          <SearchForm onChange={handleSearch} searchQuery={searchQuery} />
          {currentUser && (
            <ShowFavoriteStocksToggle
              isShowFavoriteStocks={isShowFavoriteStocks}
              setIsShowFavoriteStocks={setIsShowFavoriteStocks}
            />
          )}
        </div>
      </header>
      <main className="pb-20 pt-72 sm:pt-52 md:pt-40">
        <InfiniteScroll
          next={() => setSize(size + 1)}
          hasMore={!isReachingEnd}
          loader={<Loader />}
          // endMessage={<p>No more stocks available...</p>}
          dataLength={paginatedStocks?.length ?? 0}
        >
          <StocksList
            stocks={paginatedStocks}
            onToggleFavorite={handleToggleFavorite}
            currentUser={currentUser}
            isShowFavoriteStocks={isShowFavoriteStocks}
            // searchTerm={searchTerm}
          ></StocksList>
        </InfiniteScroll>
        {/* {isLoadingMore && <Loader />} */}
        {/* Button to load the next page */}
        {/* {!isReachingEnd && (
          <button
            className="p-2 bg-red-800"
            onClick={() => setSize(size + 1)}
            disabled={isLoadingMore || isReachingEnd}
          >
            {isLoadingMore
              ? "Loading..."
              : isReachingEnd
              ? "No more stocks"
              : "Load more"}
          </button>
        )} */}
      </main>
      <footer className="fixed bottom-0 z-10 w-full text-center p-6 bg-accent-4 bg-opacity-90">
        <span>Made with 🍕 in Berlin</span>
      </footer>
    </>
  );
}
