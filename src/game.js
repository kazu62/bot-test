import axios from "axios"

exports.handler = async function(event,context,callback){
  const webhookBody = JSON.parse(event.body)
  const targetEvent = body.events[0]

  const matchResult = targetEvent.message.text.match(/[\d+]|スタート/)
  if(!marchResult){
    callback(null,{})
  }

  const data = {
    replyToken:webhookBody.events[0].replayToken,
    messages:[
      {
      type:'text',
      text:'技術書店の締め切りまであと7日, だけど進捗は10% あなたはどうする？',
      quickReply:{
        items:[
          {
            type:"actin",
            action:{
              type:'message',
              label:'限界まで頑張る',
              text:'[1]限界まで頑張る'
            }
          },
          {
            type:"actin",
            action:{
              type:'message',
              label:'寝る',
              text:'[2]寝る'
            }
          },
          {
            type:"actin",
            action:{
              type:'message',
              label:'出店をやめる',
              text:'[3]出店をやめる'
            }
          },

          ]
        }
      }
    ]
  }

  const res = await axios.post('https://api.line.me/v2/bot/message/reply',data,{
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${process.env.CHANNEL_TOKEN}`
    }
  })

  callback(null,{
    statusCode:200,
    body:JSON.stringify(event)
  })
}
