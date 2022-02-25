



//notifications 


const [chatMessages, setChatMessages] = useState([])
const [isRead, setIsRead] = useState(false)

const readsRef = db.collection('rooms').doc(id).collection('messages')

useEffect(() => {

    const unsubscribe = readsRef.orderBy('timestamp', 'desc')

        .limit(1).onSnapshot((snapshot) => {
            snapshot.docs.map((snap) => {
                setChatMessages(snap.data().message)

                 readsRef.doc(snap.id).collection('read').doc(userID.uid).onSnapshot((snapshot1 => {
                    if (snapshot1.get('readReceipt') === userID.uid) {
                        setIsRead(true)
   
                    }
            
                }))

            })

    })
    return unsubscribe;
    
}, [isRead])


 return (

 <SidebarOptionChannel>

                   
    <span># </span>{title} - {chatMessages}<span>{isRead ? null : <UnreadBadge> 
    <span>1</span></UnreadBadge>  }</span>

  </SidebarOptionChannel>
 )

 var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
starCountRef.on('value', (snapshot) => {
  const data = snapshot.val();
  updateStarCount(postElement, data);
});