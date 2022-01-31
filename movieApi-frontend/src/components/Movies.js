import React, { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import Header from './Header';
function Movies() {
  let [allmovies, setAllmovies] = useState([""]);
  // addmodal
  let [movie, setMovie] = useState("");
  let [genre, setGenre] = useState("");
  // updatemodal
  let [upmovie, setUpmovie] = useState("");
  let [upgenre, setUpgenre] = useState("");
  //updatemov need id
  let [upid, setUpid] = useState("");
  // modal
  let [modal, setModal] = useState(true);
  //
  let navigate = useNavigate();
  const { state } = useLocation();// view btn sending movie detail for showing view modal
  // view modal div
  let [viewmodal, setViewmodel] = useState(false);
  //--------------------- fetch all movies----------------------------------------------
  useEffect(() => {
    let controller= new AbortController();
    let signal = controller.signal;
    let token = localStorage.getItem("token");
    fetch("http://localhost:8000/movies", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal:signal
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAllmovies(data);
      })
      .catch((err) => console.log(err));
      // cleanup
      return ()=>{
        controller.abort();
      }
  }, []);
  //---------------------delete movie-----------------------------------------------------
  function deletehandle(id) {
    console.log(id);
    let upmov = {};
    fetch(`http://localhost:8000/movies/deletemovie/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        console.log("movie deleted");
        upmov = allmovies.filter((m) => {
          return m.id !== id;
        });
        setAllmovies(upmov);
      })
      .catch((err) => console.log(err));
  }
  //--------------------------------------add movies-----------------------------------------
  function addmovieHandle() {
    let admov = {
      moviename: movie,
      genre: genre,
    };
    console.log(admov);
    fetch("http://localhost:8000/movies/createmovie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(admov),
    })
      .then((response) => response.json())
      .then((data) => {
        setAllmovies([...allmovies, data.movie]);
        setMovie("");
        setGenre("");
      })
      .catch((err) => console.log(err));
  }
  //------------------------------------------ update movie--------------------------------------

  function upmovieHandle(id) {
    let mov_need_update = allmovies.filter((m) => {
      return m._id === id;
    });
    let [{ moviename, genre }] = mov_need_update;
    setUpmovie(moviename);
    setUpgenre(genre);
  }
  // index of movie i want to update
  let upindex = allmovies.findIndex((m) => {
    if (upid !== undefined) {
      return m._id === upid;
    } else {
      return null;
    }
  });

  function upmovie_modal() {
    let up_this_obj = {
      moviename: upmovie,
      genre: upgenre,
    };
    console.log(up_this_obj);
    fetch(`http://localhost:8000/movies/updatemovie/${upid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(up_this_obj),
    })
      .then((response) => response.json())
      .then((message) => {
        console.log(message); // remove in production
      })
      .catch((err) => console.log(err));
    // i need to fetch updated movie with id
    fetch(`http://localhost:8000/movies/${upid}`)
      .then((response) => response.json())
      .then((movie) => {
        console.log(movie); // remove in production
        let upallmovies = [...allmovies];
        upallmovies[upindex] = movie;
        setAllmovies([...upallmovies]);
        //i want to empty update field
        setUpmovie("");
        setUpgenre("");
        // to show addmodal and hide update modal
        setModal(true);
      })
      .catch((err) => console.log(err));
  }

  //-------------------------------logout functionality------------------------
  // not working now
  function handleLogout() {
    let token = localStorage.getItem("token");
    fetch(`http://localhost:8000/users/logout`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }
  //-----------------------------------------------------------------------------------------------
  return (
    <div>
      <div>
        <Header/>
      </div>
    <div className="moviepage">
      <h1>Movies page</h1>
      {modal ? (
        <div>
          <div className="addmodal">
            <input
              type="text"
              name="movie"
              placeholder="enter movie name"
              value={movie}
              onChange={(event) => {
                setMovie(event.target.value);
              }}
            />
            <input
              type="text"
              name="genre"
              placeholder=" enter genre"
              value={genre}
              onChange={(event) => {
                setGenre(event.target.value);
              }}
            />
            <button
              onClick={() => {
                addmovieHandle();
              }}
              className="add-btn"
            >
              ADD
            </button>
          </div>{" "}
          <br />
        </div>
      ) : (
        /*------------------ add movie modal end here ##############----------------------------- */
        <div>
          {/*---------------- update movie modal ------------------------------------------------------------*/}
          <div className="updatemodal">
            <input
              type="text"
              name="upmovie"
              value={upmovie}
              onChange={(event) => {
                setUpmovie(event.target.value);
              }}
            />
            <input
              type="text"
              name="upgenre"
              value={upgenre}
              onChange={(event) => {
                setUpgenre(event.target.value);
              }}
            />
            <button
              onClick={() => {
                upmovie_modal();
              }}
              className="update-btn"
            >
              UPDATE
            </button>
          </div>{" "}
          <br />
          {/*---------------- update movie modal end here ###########---------------------------*/}
        </div>
      )}
      {/*################# upper ternary (modal) end here ###################################### */}
      {/*------------ viewmodal ternary start ------------------------------------------- */}
      {viewmodal ? (
        //viewmodel div for movie - when view btn clicked viewmodal showup and on close it hide
        <div className="viewmodal">
          <button
            onClick={() => {
              setViewmodel(false);
            }}
            className="viewcls-btn">close</button> {/* close btn for closing view modal  */}
          <div className="mov-detail">
             <h1>movie detail</h1>
             <p>movie:{state.noviename}</p>
             <p>genre:{state.genre}</p>
             <p>id: {state._id}</p>
          </div>
          
        </div>
      ) : (
        /* show all fetch movies------------------------------------- */
        <table>
          <tbody>
            {allmovies.map((mo, index) => {
              return (
                <tr key={index}>
                  <td>{mo.moviename}</td>
                  <td>{mo.genre}</td>
                  <td>
                      <button onClick={() => {
                      setViewmodel(true);
                      navigate('/movies',{ state:mo})
                    }} className="view-btn">VIEW </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        upmovieHandle(mo._id);
                        setUpid(mo._id);
                        setModal(false);
                      }}
                      className="update-btn"
                    >
                      UPDATE
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        deletehandle(mo._id);
                      }}
                      className="delete-btn"
                    >
                      DELETE
                    </button>
                  </td>
                  
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {/*############################# viewmodal ternary start ######################### */}
    </div>
    </div>
  );
}
export default Movies;
