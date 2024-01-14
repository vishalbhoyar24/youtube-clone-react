import React, { useEffect, useState } from "react";
import { toggleMenu } from "../utils/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setshowSuggestion] = useState(false);

  const dispatch = useDispatch();
  const searchCache = useSelector((store) => store.search);

  useEffect(() => {
    // ! api call

    // !  make an api call after every key press
    // !  but if the difference between 2 api calls is <200ms
    // !  decline the api call
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestion();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  /**
   * key -i
   * render the component
   * start timer=>make api call after 200ms
   *
   * key ip
   * destroy the component(useeffect return method)
   * render the component
   * use effect()
   * start timer=>make api call after 200ms
   *
   * settimeout(200)-make an api call
   */
  const getSearchSuggestion = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    // console.log(json[1]);
    setSuggestions(json[1]);
    // !update cache
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="grid grid-flow-col p-5 shadow-lg">
      <div className="flex col-span-1">
        <img
          onClick={() => {
            toggleMenuHandler();
          }}
          className="h-8 cursor-pointer"
          src="https://static.vecteezy.com/system/resources/previews/002/292/406/non_2x/hamburger-menu-line-icon-free-vector.jpg"
          alt="hamburger_menu"
        />
        <img
          className="h-8 mx-2"
          src="https://cdn.mos.cms.futurecdn.net/8gzcr6RpGStvZFA2qRt4v6-1200-80.jpg"
          alt="youtube_logo"
        />
      </div>
      <div className="px-10 col-span-10 ">
        <div>
          <input
            className=" px-5 w-1/2 border border-gray-400 py-2 rounded-l-full"
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            onFocus={() => setshowSuggestion(true)}
            onBlur={() => setshowSuggestion(false)}
          />
          <button className="border border-gray-400 p-2  rounded-r-full  bg-gray-100 ">
            search
          </button>
        </div>
        {showSuggestions && (
          <div className=" fixed bg-white py-2 px-2 w-[37rem] shadow-lg rounded-lg border-gray-100">
            <ul>
              {suggestions.map((s) => (
                <li key={s} className="py-2 shadow-sm hover:bg-gray-100">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div>
        <img
          className=" h-8 col-span-1"
          src="https://cdn-icons-png.flaticon.com/512/666/666201.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Head;
