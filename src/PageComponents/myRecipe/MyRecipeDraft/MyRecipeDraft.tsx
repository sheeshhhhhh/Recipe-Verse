import DraftSkeleton from "./DraftSkeleton";
import DraftTable from "./DraftTable"
import SearchDraft from "./Search";
import useDraft from "./useDraft.hook";

// this is not yet finish might wanna tweak some stuff
export type DraftDataType = {  
    id: string,
    title: string,
    createAt: Date, // i don't know if this should be a date or string
    updateAt: Date,
}

// this is just an example data an d should be deleted later
export const draftData: DraftDataType[] = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    createAt: new Date('2024-07-20T14:48:00.000Z'),
    updateAt: new Date('2024-07-25T10:30:00.000Z'),
  },
  {
    id: '2',
    title: 'Chicken Alfredo',
    createAt: new Date('2024-07-18T08:22:00.000Z'),
    updateAt: new Date('2024-07-24T12:45:00.000Z'),
  },
  {
    id: '3',
    title: 'Beef Stroganoff',
    createAt: new Date('2024-07-15T16:05:00.000Z'),
    updateAt: new Date('2024-07-23T09:10:00.000Z'),
  },
  {
    id: '4',
    title: 'Vegetarian Chili',
    createAt: new Date('2024-07-12T13:50:00.000Z'),
    updateAt: new Date('2024-07-21T11:20:00.000Z'),
  },
  {
    id: '5',
    title: 'Pancakes with Maple Syrup',
    createAt: new Date('2024-07-10T07:30:00.000Z'),
    updateAt: new Date('2024-07-20T08:45:00.000Z'),
  },
  {
    id: '6',
    title: 'Grilled Salmon with Lemon Butter',
    createAt: new Date('2024-07-08T10:15:00.000Z'),
    updateAt: new Date('2024-07-18T15:00:00.000Z'),
  },
  {
    id: '7',
    title: 'Apple Pie',
    createAt: new Date('2024-07-05T14:00:00.000Z'),
    updateAt: new Date('2024-07-17T09:25:00.000Z'),
  },
  {
    id: '8',
    title: 'Caesar Salad',
    createAt: new Date('2024-07-03T12:30:00.000Z'),
    updateAt: new Date('2024-07-16T10:10:00.000Z'),
  }
];

const MyRecipeDraft = () => {

    const { loading, deleteDraft, uploadDraft, handleSearch } = useDraft()

    if(loading) return <DraftSkeleton />

    return (
        <div>
            <div className="flex flex-col items-center px-10">
                <div className="w-full flex justify-start">
                  <SearchDraft handleSearch={handleSearch} />
                </div>
                <DraftTable
                uploadDraft={uploadDraft}
                deleteDraft={deleteDraft} 
                DraftData={draftData}
                />
            </div>
        </div>
    )
}

export default MyRecipeDraft