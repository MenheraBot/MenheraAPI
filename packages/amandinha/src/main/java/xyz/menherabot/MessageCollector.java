package xyz.menherabot;

import javax.annotation.Nonnull;

import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;

public class MessageCollector extends ListenerAdapter {
  private final long messageId;
  private EmbedBuilder embedToSend;

  public MessageCollector(long messageId, EmbedBuilder embedToSend) {
    this.messageId = messageId;
    this.embedToSend = embedToSend;
  }

  @Override
  public void onMessageReceived(@Nonnull MessageReceivedEvent e) {
    if (e.getAuthor().getIdLong() != Constants.OWNER_ID) return;

    e.getJDA().removeEventListener(this);

    this.embedToSend.addField("Motivo", e.getMessage().getContentRaw(), true);

    e.getMessage().delete().queue();

    e.getChannel().deleteMessageById(this.messageId).queue();

    e.getGuild().getTextChannelById(Constants.NEGATED_CHANNEL).sendMessageEmbeds(this.embedToSend.build()).queue();
  }
}
