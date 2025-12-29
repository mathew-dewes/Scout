import { deletePlaceAction } from "@/app/actions";
import { Button } from "../ui/button";

export default function DeletePlaceButton({placeId, imageStorageId}:{placeId: string, imageStorageId: string | undefined}){
    return (
        <form>
      <input type="hidden" name="placeId" value={placeId} />
      <input type="hidden" name="imageStorageId" value={imageStorageId} />
      <Button formAction={deletePlaceAction} variant={"destructive"}>Delete</Button>
        </form>
              
    )
}