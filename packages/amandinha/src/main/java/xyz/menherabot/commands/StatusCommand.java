package xyz.menherabot.commands;

import javax.annotation.Nonnull;

import net.dv8tion.jda.api.entities.Role;
import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import xyz.menherabot.Constants;

public class StatusCommand extends ListenerAdapter{
  @Override
  public void onSlashCommandInteraction(@Nonnull SlashCommandInteractionEvent e) {
    if(!e.getName().equals("status")) return;

    Role role = e.getGuild().getRoleById(Constants.STATUS_ROLE);

    if(e.getMember().getRoles().contains(role)) {
      e.getGuild().removeRoleFromMember(e.getMember(), role).queue();
      e.reply("Como desejar! Você não será mais notificado dos status da Menhera!").queue();
      return;
    }

    e.getGuild().addRoleToMember(e.getUser(), role).queue();
    e.reply("Feitoria! Você será notificado dos status da Menhera").queue();

  }
}
