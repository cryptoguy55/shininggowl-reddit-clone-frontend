import UpvoteIcon from "@material-ui/icons/ThumbUpAlt"
import DownvoteIcon from "@material-ui/icons/ThumbDownAlt"

export default function list() {
  return (
  <div className="flex flex-row"> 
    <div>
    {
    [1,2,3,4,5,6,7,8,9,10].map((item) => 
    <div className="flex w-full mb-4" key={item}>
    <div style={{borderRight: "1px solid"}} className="mr-2 pr-2">
      <UpvoteIcon/> <br/>50<br/>
      <DownvoteIcon/> 
    </div>
    <div>
      <p>r/football posted by superman2342   5 hours ago</p>
      <p className="text-xl underline-dark-600"><a href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit</a></p>
      <p>
      I am trying out mpdecimate using ffmpeg-python library https://pypi.org/project/ffmpeg-python/. However, I get a file not found error for the simple code below. def remove_duplicate_ffmpeg...
      </p>
      <br/>
      <p className="float-right mr-2">
        <span className="border-blue-500 border mr-1 p-1  rounded-full">python</span>
        <span className="border-blue-500 border mr-1 p-1  rounded-full">c#</span>
        <span className="border-blue-500 border mr-1 p-1  rounded-full">flutter</span>
        <span className="border-blue-500 border mr-1 p-1  rounded-full">react</span>
        <span className="border-blue-500 border mr-1 p-1  rounded-full">Django</span>
      </p>
    </div>
      </div>

    )
  }
    </div>
 </div>   
  )
}