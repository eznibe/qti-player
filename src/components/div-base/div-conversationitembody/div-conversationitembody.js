var DivConversationItemBody = (function () {
    function DivConversationItemBody() {}

    DivConversationItemBody.prototype.created = function(){
      this.super();
      this.mainClass = 'dialog__body';
    };

    return DivConversationItemBody;
})();

Polymer('div-conversationitembody', DivConversationItemBody.prototype);