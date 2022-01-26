
function UserProfile(){
    let username =localStorage.getItem("username");
    return(
        <div className="profile">
            
           
            <div>{username}</div>
            
        </div>
    )
}
export default UserProfile;