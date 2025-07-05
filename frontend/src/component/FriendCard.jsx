import {LANGUAGE_TO_FLAG }from "../constants/index.js";
const FriendCard = ({ friend }) => {
  return (
    <div className="bg-base-200 card hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="avatar size-12">
            <img src={friend.profilpic} alt={friend.fullname} />
          </div>
          <h3 className="font-semibold truncate"> {friend.fullname}</h3>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(friend.nativelanguage)}
            Native: {friend.nativelanguage}
          </span>
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(friend.learninglanguage)}
            Learning: {friend.learninglanguage}
          </span>
        </div>
        <Link to={`/user/${friend._id}`} className="btn btn-outline w-full"> Message </Link>
      </div>
    </div>
  );
};

export default FriendCard;


export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}
